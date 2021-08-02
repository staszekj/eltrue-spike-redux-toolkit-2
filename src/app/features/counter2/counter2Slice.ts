import * as toolkit from "@reduxjs/toolkit";
import * as counterSlice from "app/features/counter/counterSlice";
import * as counter2Actions from "./counter2Actions";

type Counter2 = {
  value2: number;
};
const initialState: Counter2 = {
  value2: 10,
};

const counter2Slice = toolkit.createSlice({
  name: "counter2",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(counterSlice.incrementByAmount, (state, action) => {
        state.value2 = action.payload;
      })
      .addCase(counter2Actions.incr, (state, action) => {
        const { value2 } = action.payload;
        state.value2 = value2;
      }),
});

export const {} = counter2Slice.actions;
export const { incr } = counter2Actions;
export default counter2Slice.reducer;
