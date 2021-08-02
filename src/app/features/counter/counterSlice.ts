import { PayloadAction } from "@reduxjs/toolkit";
import * as toolkit from "@reduxjs/toolkit";
import {
  AppThunk,
  AppThunkApiConfig,
  AppRootState,
  AppDispatch,
  AppGetState,
} from "../../store";
import * as counter2Slice from 'app/features/counter2/counter2Slice'
import * as counter2Actions from "app/features/counter2/counter2Actions";

const myTimeout = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

export const doSomethingAsync = toolkit.createAsyncThunk<
  Promise<string>,
  number,
  AppThunkApiConfig
>("counter/doSomethingAsync", async (time, { getState, dispatch }) => {
  console.log("!!! CALL doSomethingAsync_0");
  await myTimeout(time);
  console.log("!!! CALL doSomethingAsync_1");
  const result = dispatch(incrementByAmount(time));
  console.log("!!! CALL doSomethingAsync_2");
  return "OK";
});

type IncAsync2Arg = {
  number: number;
};
export const incrementAsync2 = toolkit.createAsyncThunk<
  { value: number },
  IncAsync2Arg,
  AppThunkApiConfig
>(
  "counter/increment",
  async (arg, api) => {
    const { dispatch, getState } = api;

    await Promise.all([dispatch(doSomethingAsync(500)), dispatch(doSomethingAsync(1000))]);
    console.log("!!! CALL incrementAsync1_4");

    dispatch(incrementByAmount(10))

    return { value: selectCount(getState()) + 1 };
  },
  {
    condition: (arg, { getState }) => {
      // const { getState } = api;
      if (getState().counter.requestId) {
        return false;
      }
      return true;
    },
  }
);

interface CounterState {
  value: number;
  requestId?: string;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = toolkit.createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync2.pending, (state, act) => {
        state.requestId = act.meta.requestId;
      })
      .addCase(incrementAsync2.fulfilled, (state, action) => {
        state.value = action.payload.value;
        delete state.requestId;
      })
      .addCase(counter2Actions.incr, (state, action) => {
        state.value = action.payload.value2
      })
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state: AppRootState) => state.counter.value;

export default counterSlice.reducer;
