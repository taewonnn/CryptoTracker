import React, {useState} from 'react';
import GlobalStyle from "./GlobalStyle";
import {ReactQueryDevtools} from "react-query/devtools";
import {darkTheme, lightTheme} from "./theme";
import {ThemeProvider} from "styled-components";


function App() {

  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark((current) => !current)

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <button onClick={toggleDark}>Mode</button>
        <GlobalStyle />
        <ReactQueryDevtools initialIsOpen={true}/>
      </ThemeProvider>
    </>
  );
}

export default App;
