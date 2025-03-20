import "./App.css";

import MainApp from "./components/WeatherInfo";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

function App() {
  return (
    <>
      <FluentProvider theme={webLightTheme}>
        <MainApp />
      </FluentProvider>
    </>
  );
}

export default App;
