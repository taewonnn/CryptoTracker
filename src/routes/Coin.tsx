import {Link, Outlet, Route, Routes, useLocation, useMatch, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Chart from ".//Chart"
import Price from ".//Price"
import {useQuery} from "react-query";
import {fetchCoinInfo, fetchCoins, fetchCoinTickers} from "./api";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  color: red;
`

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
  props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;


interface IRouteState {
  state: {
    name: string;
  };
}


interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}


export default function Coin() {

  // useMatch()  => url이 ()안에 있는 랜딩에 있는지!
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const {coinId} = useParams()
  console.log(coinId)

  const {state} = useLocation() as IRouteState;
  console.log(state);


  // React Query 사용
  const {isLoading: infoLoading, data:infoData} = useQuery<InfoData>(['info', coinId], () => fetchCoinInfo(coinId))
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const loading = infoLoading || tickersLoading

  // const [loading, setLoading] = useState(true);
  //
  // const [info, setInfo] = useState<InfoData>();
  //
  // const [priceInfo, setPriceInfo] = useState<PriceData>();

  //
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     console.log(infoData);
  //     setInfo(infoData);
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     console.log(priceData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //
  //   })()
  // }, [coinId])


  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "loading..." : infoData?.name}</title>
      </Helmet>
      <Header>
        <Title>{state?.name ? state.name : loading ? "loading..." : infoData?.name}</Title>
      </Header>
      {/*{loading ? <Loader>Loading...</Loader> : <span>{priceInfo?.quotes.USD.price}</span>}*/}
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>

          <Description>{infoData?.description}</Description>

          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>


          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{coinId}}/>
        </>
      )}
      </Container>
    )
  }



// React Query 사용 전
// export default function Coin() {
//
//   // useMatch()  => url이 ()안에 있는 랜딩에 있는지!
//   const priceMatch = useMatch("/:coinId/price");
//   const chartMatch = useMatch("/:coinId/chart");
//
//   const {coinId} = useParams()
//   console.log(coinId)
//
//   const {state} = useLocation() as IRouteState;
//   console.log(state);
//
//
//   // React Query 사용
//   const {isLoading: infoLoading, data:infoData} = useQuery<InfoData>(['info', coinId], () => fetchCoinInfo(coinId))
//   const {isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>(['tickers',coinId], () => fetchCoinTickers(coinId))
//
//   const loading = infoLoading || tickersLoading
//
// const [loading, setLoading] = useState(true);
//
// const [info, setInfo] = useState<InfoData>();
//
// const [priceInfo, setPriceInfo] = useState<PriceData>();
//
//
// useEffect(() => {
//   (async () => {
//     const infoData = await (
//       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
//     ).json();
//     console.log(infoData);
//     setInfo(infoData);
//     const priceData = await (
//       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
//     ).json();
//     console.log(priceData);
//     setPriceInfo(priceData);
//     setLoading(false);
//
//   })()
// }, [coinId])
//
//
//   return (
//     <Container>
//       <Header>
//         <Title>{state?.name ? state.name : loading ? "loading..." : info?.name}</Title>
//       </Header>
//       {/*{loading ? <Loader>Loading...</Loader> : <span>{priceInfo?.quotes.USD.price}</span>}*/}
//       {loading ? (
//         <Loader>Loading...</Loader>
//       ) : (
//         <>
//           <Overview>
//             <OverviewItem>
//               <span>Rank:</span>
//               <span>{info?.rank}</span>
//             </OverviewItem>
//             <OverviewItem>
//               <span>Symbol:</span>
//               <span>${info?.symbol}</span>
//             </OverviewItem>
//             <OverviewItem>
//               <span>Open Source:</span>
//               <span>{info?.open_source ? "Yes" : "No"}</span>
//             </OverviewItem>
//           </Overview>
//
//           <Description>{info?.description}</Description>
//
//           <Overview>
//             <OverviewItem>
//               <span>Total Suply:</span>
//               <span>{priceInfo?.total_supply}</span>
//             </OverviewItem>
//             <OverviewItem>
//               <span>Max Supply:</span>
//               <span>{priceInfo?.max_supply}</span>
//             </OverviewItem>
//           </Overview>
//
//
//           <Tabs>
//             <Tab isActive={chartMatch !== null}>
//               <Link to={`/${coinId}/chart`}>Chart</Link>
//             </Tab>
//             <Tab isActive={priceMatch !== null}>
//               <Link to={`/${coinId}/price`}>Price</Link>
//             </Tab>
//           </Tabs>
//           <Outlet />
//         </>
//       )}
//       </Container>
//     )
