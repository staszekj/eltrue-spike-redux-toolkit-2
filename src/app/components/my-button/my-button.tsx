import React, { useState } from "react";
import { FlowNodeBase } from "typescript";
import styles from "./my-button.module.css";

type MyButtonProps = {
  value: string;
};

const MyButton = (props: MyButtonProps) => {
  const { value } = props;
  const [val, setVal] = useState(0);

  const handler = () => {
    new Promise(resolve => resolve(10)).then(value => Promise.resolve(value)).then(val => console.log(val));

    setVal(1);
    setVal(2);
    setVal(3);
    setVal(4);
    setVal(5);
    setVal(6);
    setVal(7);
    setVal(8);
    setVal(9);
    setVal(10);
  };

  console.log("!!! render my button");

  return (
    <button className={styles.button} onClick={handler}>
      {value}
    </button>
  );
};

export default MyButton;
