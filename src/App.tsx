import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { SimpleApiCaller } from "./app/features/simple-api-caller/simple-api-caller";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100vw",
    },
    tt: {
      color: theme.palette.primary.main,
    },
  };
});

function App() {
  const classes = useStyles();

  return (
    <div>
      <SimpleApiCaller />
    </div>
  );
}

export default App;
