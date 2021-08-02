import * as toolkit from '@reduxjs/toolkit'
import type {PaletteType} from "@material-ui/core";
import type {AppRootState} from "app/store"

type InitialState = {
    paletteType: PaletteType
}

const initialState = {
    paletteType: 'light'
} as InitialState

const slice = toolkit.createSlice({
    name: 'palette',
    initialState,
    reducers: {}
})


export const getPaletteType = (state: AppRootState) => state.palette.paletteType

export const {reducer, actions} = slice;