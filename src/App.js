import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/appStore";
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>

  );
}

export default App;
