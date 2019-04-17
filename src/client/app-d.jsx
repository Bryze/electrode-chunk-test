//
// This is the client side entry point for the React app.
//

import React from "react";
import { render, hydrate } from "react-dom";
import { renderToString} from "react-dom/server";
// import { desktop } from "./routes";
import { routes } from "./routes-d";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { renderRoutes } from "react-router-config";

//

//
// Redux configure store with Hot Module Reload
//
const configureStore = initialState => {
  const store = createStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

const store = configureStore(window.__PRELOADED_STATE__);

const start = App => {
  const jsContent = document.querySelector(".js-content");
  const reactStart = window.__PRELOADED_STATE__ && jsContent.innerHTML ? hydrate : render;

  reactStart(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    jsContent
  );
};

window.webappStart = () => start(() => renderRoutes(routes));
// window.webappStart = () => start(() => renderRoutes(desktop));

//
// Hot Module Reload setup
//

// if (module.hot) {
//   module.hot.accept("./routes", () => {
//     const r = require("./routes");
//     start(() => renderRoutes(r.desktop));
//   });
// }

if (module.hot) {
  module.hot.accept("./routes-d", () => {
    const r = require("./routes-d");
    start(() => renderRoutes(r.routes));
  });
}
