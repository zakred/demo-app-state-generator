import "./App.css";
import React, {useEffect} from "react";
import Main from "./pages/main/main";
import {useSelector} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const st = useSelector((st) => st);
  useEffect(() => {
    console.log("state changed");
  }, [st]);

  return (
    <React.Fragment>
      <Main />
    </React.Fragment>
  );
};

export default App;
