import React from "react";
import { store } from "./src/redux/createStore";
import { Provider } from "react-redux";

const wrapper = ({ element }: any) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  return <Provider store={store}>{element}</Provider>;
};

export default wrapper;
