import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk, AppThunkApiConfig, AppRootState, AppDispatch, AppGetState } from "../../store";
import axios from "axios";
import type {
  TSimpleRoleResponse,
  TRole,
  TSimpleIncementResponse,
  TSimpleIncementRequest,
} from "common/simple-api-caller";

import {
  SIMPLE_API_CALL_ROLE_PATH,
  SIMPLE_API_CALL_INCREMENT_PATH,
} from "common/endpoints";
import {envUserDomain} from 'common/simple-api-caller'

export const callSimpleRole = createAsyncThunk<
  { role: TRole, originPort: number, requestUrl: string},
  void,
  AppThunkApiConfig
>("simple-api-caller/role", async () => {
  const result = await axios.get<TSimpleRoleResponse>(SIMPLE_API_CALL_ROLE_PATH);
  return { role: result.data.role, originPort: result.data.originPort, requestUrl: result.data.requestUrl };
});

export const callSimpleRefresh = createAsyncThunk<
  { value: number },
  void,
  AppThunkApiConfig
>("simple-api-caller/get", async (arg, api) => {
  const {getState} = api
  const requestData: TSimpleIncementRequest = {
    value: 0
  }
  const state = getState();
  const result = await axios.get<TSimpleIncementResponse>(selectIncrementFullUrl(state));
  return { value: result.data.value };
});

export const callSimpleIncrement = createAsyncThunk<
  { value: number },
  void,
  AppThunkApiConfig
>("simple-api-caller/increment", async (arg, api) => {
  const {getState} = api
  const state = getState();
  const requestData: TSimpleIncementRequest = {
    value: selectIsHacker(state) ? -1 : 10
  }
  const result = await axios.put<TSimpleIncementResponse>(selectIncrementFullUrl(state), requestData);
  return { value: result.data.value };
});

interface SimpleApiCallerState {
  value: number;
  role: TRole;
  originPort?: number;
  requestUrl?: string;
}

const initialState: SimpleApiCallerState = {
  value: 0,
  role: 'developer'
};

export const simpleApiCallerSlice = createSlice({
  name: "simple-api-caller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(callSimpleRefresh.pending, (state) => {
        state.value = 0;
      })
      .addCase(callSimpleRefresh.fulfilled, (state, action) => {
        state.value = action.payload.value;
      })
      .addCase(callSimpleRole.fulfilled, (state, action) => {
        state.role = action.payload.role;
        state.originPort = action.payload.originPort;
        state.requestUrl = action.payload.requestUrl;
      })
      .addCase(callSimpleIncrement.fulfilled, (state, action) => {
        state.value = action.payload.value;
      });
  },
});

export const {} = simpleApiCallerSlice.actions;
export const selectIncrementFullUrl = (state: AppRootState) => `${selectRequestUrl(state)}${SIMPLE_API_CALL_INCREMENT_PATH}`;
export const selectResult = (state: AppRootState) => state.simpleApiCaller.value;
export const selectRole = (state: AppRootState) => state.simpleApiCaller.role;
export const selectRequestUrl = (state: AppRootState) => state.simpleApiCaller.requestUrl;
export const selectOriginPort = (state: AppRootState) => state.simpleApiCaller.originPort;
export const selectIsHacker = (state: AppRootState) => selectRole(state) === 'hacker';
export default simpleApiCallerSlice.reducer;
