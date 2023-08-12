import React, {useState} from 'react';
import GlobalStyle from "./GlobalStyle";
import {ReactQueryDevtools} from "react-query/devtools";
import {darkTheme, lightTheme} from "./theme";
import {ThemeProvider} from "styled-components";
import {RouterProvider} from "react-router-dom";
import router from "./routes/Rotuer";
import {useRecoilValue} from "recoil";
import {isDarkAtom} from "./atoms";


function App() {

  // 다크모드
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={isDark? darkTheme : lightTheme}>
        <GlobalStyle />
        <ReactQueryDevtools initialIsOpen={true}/>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
