import { Provider } from "react-redux";
import { Analytics } from "@vercel/analytics/react";
import Body from "./components/BodyLayout";
import AppStore from "./utils/AppStore";

function App() {
  return (
    <Provider store={AppStore}>
      <Body />
      <Analytics />
    </Provider>
  );
}

export default App;