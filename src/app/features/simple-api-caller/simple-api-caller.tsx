import React, { useState, useEffect } from "react";
import {
  callSimpleRefresh,
  callSimpleIncrement,
  callSimpleRole,
  selectResult,
  selectRole,
  selectRequestUrl,
  selectOriginPort,
  selectIsHacker
} from "./simple-api-caller-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Box, Button, Grid, Paper, makeStyles } from "@material-ui/core";
import type { MyTheme } from "app/models/theme";
import {TRole} from 'common/simple-api-caller'

type TSimpleAPiCaller = {
  prop1?: number;
};

const useStyles = makeStyles<MyTheme, TSimpleAPiCaller>((theme) => {
  return {
    paper: {
      padding: "1rem",
    },
    button: {
      textTransform: "none",
    },
    header: {
      "& .bold": {
        fontWeight: "bold",
      },
      "& .padding": {
        paddingLeft: "0.25rem",
        textOverflow: 'ellipsis'
      },
    },
    fontSize100: {
      fontSize: 100
    }
  };
});

export function SimpleApiCaller(props: TSimpleAPiCaller) {
  const result = useAppSelector(selectResult) || "--";
  const role = useAppSelector(selectRole);
  const applicationDesctArr: Record<TRole,string> = {
    user: 'Genuine Application',
    developer: 'Developer Application',
    hacker: 'Fake Application'
  } 
  const applicationDescr = applicationDesctArr[role];
  const url = useAppSelector(selectRequestUrl) || "<empty string>";
  const port = useAppSelector(selectOriginPort);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const classes = useStyles(props);
  useEffect(() => {
    dispatch(callSimpleRole());
  }, []);

  return (
    <Grid container justify="space-around">
      <Grid item xs={6}>
        <Paper variant="elevation" className={classes.paper}>
          <Grid container direction="column" spacing={2}>
            <Grid item className={classes.header}>
              <Box>
                <span>I'm:</span>
                <span className="bold padding">{applicationDescr}</span>
              </Box>
              <Box>
                <span>Origin server port:</span>
                <span className="bold padding">{port}</span>
              </Box>
              <Box>
                <span>Requests are sent to:</span>
                <span className="bold padding">{url}</span>
              </Box>
            </Grid>
            <Grid item>
              <Grid container justify="space-around">
                <Grid item>
                  <Box className={classes.fontSize100}>{result}</Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={2} justify="space-around">
                <Grid item>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => dispatch(callSimpleIncrement())}
                  >
                    {useAppSelector(selectIsHacker) ? 'Decrement' : 'Increment'}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    disableElevation
                    onClick={() => dispatch(callSimpleRefresh())}
                  >
                    Refresh
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
