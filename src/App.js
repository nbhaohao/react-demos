import FormDemo from "./components/FormDemo";
import ReduxDemo from "./components/ReduxDemo";

function App() {
  const isShowFormDemo = false;
  const isShowReduxDemo = true;
  return (
    <div className="App">
      {isShowFormDemo && <FormDemo />}
      {isShowReduxDemo && <ReduxDemo />}
    </div>
  );
}

export default App;
