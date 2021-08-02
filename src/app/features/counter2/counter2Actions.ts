import * as toolkit from "@reduxjs/toolkit";

type IncrAction = { value2: number; };
export const incr = toolkit.createAction<IncrAction>("counter2/incr");
