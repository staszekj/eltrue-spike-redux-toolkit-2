import React, { useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync2,
  selectCount,
} from "./counterSlice";
import * as counter2Slice from "../counter2/counter2Slice";
import * as IncrAction from "../counter2/counter2Actions";
import styles from "./Counter.module.css";
import * as books from "app/features/books/books.slice";

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>Ž
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            batch(() => {
              dispatch(counter2Slice.incr({ value2: Number(incrementAmount) || 0 }));
              dispatch(books.addBook({id: 'aa', title: 'Stas'}))
            })
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync2({ number: Number(incrementAmount) || 0 }))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
