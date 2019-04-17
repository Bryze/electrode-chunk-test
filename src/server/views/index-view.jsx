//
// This is the server side entry point for the React app.
//

import ReduxRouterEngine from "electrode-redux-router-engine";
import { routes as MRoutes } from "../../client/routes-m";
import { routes as DRoutes } from "../../client/routes-d";
import rootReducer from '../../client/reducers';
import { inputName } from "../../client/actions";

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

let routesEngine;

const getDeviceType = (header) => {
	if(header['user-agent'].match(/mobile/i)) {
		return 'mobile';
	} else if (header['user-agent'].match(/iPad|Android|Touch/i)) {
		return 'mobile';
	} else {
		return 'desktop';
	}
}

module.exports = req => {

  let routeType;
  let dtype = getDeviceType(req.headers);
  if(dtype === 'mobile') {
    routeType = MRoutes;
  } else {
    routeType = DRoutes;
  }


  if (!routesEngine) {
    routesEngine = new ReduxRouterEngine({ routes: routeType, withIds: true });
  }

  return routesEngine.render(req);
};
