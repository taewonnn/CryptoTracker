import React from 'react';
import GlobalStyle from "./GlobalStyle";
import {ReactQueryDevtools} from "react-query/devtools";


function App() {
  return (
    <>
      <GlobalStyle />
      <ReactQueryDevtools initialIsOpen={true}/>
    </>
  );
}

export default App;
