import FormDemo from "./components/FormDemo";

function App() {
  const isShowFormDemo = true;
  return <div className="App">{isShowFormDemo && <FormDemo />}</div>;
}

export default App;
