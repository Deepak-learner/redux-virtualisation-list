import React, { useState, useRef, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setList } from "../redux/actions/listActions";
import { setLoad } from "../redux/actions/listActions";
import { setIndex } from "../redux/actions/listActions";
import { setFetch } from "../redux/actions/listActions";

let renderArr = [];
let countOfUpdateInArr = 0;
let countOfSkip = 0;
let elementArr = [];
let count = 0;
let check = false;

const List = () => {
  const ref = useRef();
  const elements = useSelector((state) => state.allElements.list);
  const loading = useSelector((state) => state.loading);
  const startIndex = useSelector((state) => state.index);
  const isfetch = useSelector((state) => state.fetch);

  const dispatch = useDispatch();
  let countOfElementsInArr = 0;

  const fetchProducts = async () => {
    if (countOfUpdateInArr !== 0) {
      dispatch(setLoad(true));
    }
    const response = await axios
      .get(
        `https://api.coinstats.app/public/v1/coins?skip=${countOfSkip}&limit=20&currency=EUR`
      )
      .catch((err) => {
        console.log("Err: ", err);
      });
    if (countOfUpdateInArr === 0) {
      for (let i = 0; i < 10; i++) {
        elementArr.push(response.data.coins[i]);
        renderArr.push(response.data.coins[i]);
      }
      for (let i = 10; i < 20; i++) {
        elementArr.push(response.data.coins[i]);
      }
      dispatch(setList(elementArr));
      dispatch(setLoad(false));
      countOfSkip = countOfSkip + 20;
      return;
    }
    for (let i = 0; i < 20; i++) {
      elementArr.push(response.data.coins[i]);
    }
    dispatch(setList(elementArr));
    countOfSkip = countOfSkip + 20;
    dispatch(setLoad(false));
  };

  // array update function for scroll down
  const updateRenderArrayDownwards = () => {
    for (let i = 0; i < 5; i++) {
      renderArr.shift();
    }
    if (startIndex < count) {
      if (check === true) {
        renderArr = [];
        for (let i = 0; i < 10; i++) {
          renderArr.push(elementArr[i]);
        }
        check = false;
        return;
      }
      for (let i = startIndex; i < startIndex + 5; i++) {
        renderArr.push(elementArr[i]);
      }
    } else {
      for (let i = startIndex; i < startIndex + 5; i++) {
        renderArr.push(elements[i]);
      }
    }
  };

  // array update function for scroll up
  const updateRenderArrayUpwards = () => {
    for (let i = 0; i < 5; i++) {
      renderArr.pop();
    }

    for (let i = startIndex - 10; i > startIndex - 15; i--) {
      renderArr.unshift(elements[i]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [isfetch]);

  useEffect(() => {
    window.onscroll = function () {
      // when scroll is on top of window.
      if (window.pageYOffset === 0 && countOfUpdateInArr !== 0) {
        if (startIndex <= 10) {
          renderArr = [];
          for (let i = 0; i < 10; i++) {
            renderArr.push(elementArr[i]);
          }
          check = true;
          dispatch(setIndex(9));

          return;
        }
        updateRenderArrayUpwards();
        dispatch(setIndex(startIndex - 5));
      } else if (
        // when scroll is on bottom of window.
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight
      ) {
        countOfUpdateInArr = countOfUpdateInArr + 1;
        dispatch(setFetch(!isfetch));
        console.log(
          "debug",
          window.innerHeight,
          window.scrollY,
          document.body.offsetHeight
        );
        updateRenderArrayDownwards();
        dispatch(setIndex(startIndex + 5));

        count = Math.max(count, startIndex);
      }
    };
  });

  useEffect(() => {
    if (countOfUpdateInArr !== 0) {
      ref.current.scrollIntoView();
    }
  });

  return (
    <div>
      {renderArr.map((d) => {
        countOfElementsInArr = countOfElementsInArr + 1;
        return (
          <div className="main-container">
            <div className="container">
              {countOfElementsInArr ===
              renderArr.length - renderArr.length / 2 ? (
                <div ref={ref} className={loading ? "loader" : "content"}>
                  <h2>{d.id}</h2>
                  <h4>{d.symbol}</h4>
                  <p>{d.rank}</p>
                </div>
              ) : (
                <div id="myId" className={loading ? "loader" : "content"}>
                  <h2>{d.id}</h2>
                  <h4>{d.symbol}</h4>
                  <p>{d.rank}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
