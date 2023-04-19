import React, {useState} from 'react';
import GlobalStyle from "./GlobalStyle";
import {ReactQueryDevtools} from "react-query/devtools";
import {darkTheme, lightTheme} from "./theme";
import {ThemeProvider} from "styled-components";
import {RouterProvider} from "react-router-dom";
import router from "./routes/Rotuer";


function App() {

  const [isDark, setIsDark] = useState(true);
  const toggleDark = () => setIsDark((current) => !current)

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <RouterProvider router={router} />
        <button onClick={toggleDark}>Mode</button>
        <GlobalStyle />
        <ReactQueryDevtools initialIsOpen={true}/>
      </ThemeProvider>
    </>
  );
}

export default App;
