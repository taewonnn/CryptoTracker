import { createBrowserRouter } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import Chart from './routes/Chart';
import Price from './routes/Price';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Coins />,
  },
  {
    path: '/:coinId',
    element: <Coin />,
    children: [
      {
        path: 'chart',
        element: <Chart />,
      },
      {
        path: 'price',
        element: <Price />,
      },
    ],
  },
]);

export default router;

// 방법1. createBrowserRouter
// Ex.
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
//   {
//     path: 'product',
//     element: <Product />,
//     children: [{}, {}],
//   },
// ]);

// 방법2. BrowserRouter 방식 - 구형 방식
// function Router() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Coins />}></Route>
//         <Route path="/:coinId" element={<Coin />}></Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }
