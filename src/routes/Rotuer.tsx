import {BrowserRouter, createBrowserRouter, Route, Routes} from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";
import Chart from "./Chart"
import Price from "./Price"
import App from "../App";


// export default function Router () {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Coins />}/>
//         <Route path="/:coinId" element={<Coin/>} />
//         <Route path="chart" element={<Chart />} />
//         <Route path="price" element={<Price />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Coins />,
    },
    {
      path: "/:coinID",
      element: <Coin />,
      children: [
        {
          path: "chart",
          element: <Chart />,
        },
        {
          path: "price",
          element: <Price />,
        },
      ],
    },
  ],
  { basename: "/reactMasterCrypto" }
);

export default router;
