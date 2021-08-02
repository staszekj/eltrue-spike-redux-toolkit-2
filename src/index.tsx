import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, StylesProvider } from "@material-ui/core";
import "./index.css";
import App from "./App";
import { AppRootState, store } from "./app/store";
import { Provider, useSelector } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import * as theme from "./app/models/theme";
import { getPaletteType } from "app/models/paletteSlice";

const ElTrueMuiProvider: FunctionComponent = ({ children }) => {
  const paletteType = useSelector(getPaletteType);
  const myTheme = theme.getMyTheme(paletteType);
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={myTheme}>{children}</MuiThemeProvider>
    </StylesProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ElTrueMuiProvider>
        <App />
      </ElTrueMuiProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
