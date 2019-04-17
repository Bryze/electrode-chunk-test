//
// This is the server side entry point for the React app.
//

import ReduxRouterEngine from "electrode-redux-router-engine";
// import { routes } from "../../client/routes-m";
import { mobile, desktop} from "../../client/routes";
// import { routes as DRoutes } from "../../client/routes-d";
import rootReducer from '../../client/reducers';
import { inputName } from "../../client/actions";

//
// This function is exported as the content for the webapp plugin.
//
// See config/default.json under plugins.webapp on specifying the content.
//
// When the Web server hits the routes handler installed by the webapp plugin, it
// will call this function to retrieve the content for SSR if it's enabled.
//
//

function createReduxStore(req, match) {
  // this refs to engine
  console.log({req, match})
  const store = configureStore();

  return Promise.all([
    // store.dispatch();
    store.dispatch(inputName('abc'))
    // dispatch any other asynchronous actions here
  ]).then( () => {
    return store;
  });
}

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
    routeType = mobile;
  } else {
    routeType = desktop;
  }


  if (!routesEngine) {
    routesEngine = new ReduxRouterEngine({ routes: routeType, withIds: true });
    routesEngine.render(req).then(result => {
      console.log({result})
    })
  }

  return routesEngine.render(req);
};
