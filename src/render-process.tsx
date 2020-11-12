import * as DOM from "react-dom";
import * as React from "react";
import App from "./app";


DOM.render(<App />, document.getElementById("root"));

const { hot } = module as any;

if (hot) {
  hot.accept();
}
