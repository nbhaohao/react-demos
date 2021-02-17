import FormDemo from "./components/FormDemo";
import ReduxDemo from "./components/ReduxDemo";
import RouterDemo from "./components/RouterDemo";

function App() {
  const isShowFormDemo = false;
  const isShowReduxDemo = false;
  const isShowRouterDemo = true;
  return (
    <div className="App">
      {isShowFormDemo && <FormDemo />}
      {isShowReduxDemo && <ReduxDemo />}
      {isShowRouterDemo && <RouterDemo />}
    </div>
  );
}

export default App;
