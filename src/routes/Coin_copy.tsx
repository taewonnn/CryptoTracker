// react-query 적용 전

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useParams, Outlet, useMatch } from 'react-router-dom';
import Chart from './Chart';
import Price from './Price';

/** style Start */
const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

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
  margin: 20px 0px;
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
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
  a {
    display: block;
  }
`;
/** style End */

/** interface Start */
interface ILocation {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags?: object;
  team?: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links?: object;
  links_extended: object;
  whitepaper?: object;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
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
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

/** interface End */

function Coin() {
  // 💡useParams() => url 뒤 파라미터 가져오기
  // <Route path="/:coinId" element={<Coin />}></Route>  -> URL : http://localhost:3000/btc
  // console.log(params) 결과 : {coinId: 'btc'}
  // const params = useParams();
  // console.log(params.coinId);

  // 파라미터에서 coinId 가져오기
  const { coinId } = useParams();

  // 💡 useLocation() => 현재 위치한 url object로 전달
  // Ex.  http://localhost:3000/btc-bitcoin 접속 시 console에 아래처럼 나옴
  // {
  //   "pathname": "/btc-bitcoin",
  //   "search": "",
  //   "hash": "",
  //   "state": {
  //       "name": "Bitcoin",
  //       "rank": 1
  //   },
  //   "key": "22z72l4x"
  // }
  // const location = useLocation();
  // console.log(location);

  // Coin에서 coindata 받아온 것 중 일부만 가져오기
  // <Link to={`/${coin.id}`} state={{ name: coin.name, rank: coin.rank }}>
  // Link 속성 중 state로 전달한 것을 받아오기
  const { state } = useLocation() as ILocation;

  // useMatch()  => 너가 특정 url에 있는지 여부 / url이 ()안에 있는 랜딩에 있는지!
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');

  // 로딩 상태
  const [loading, setLoading] = useState(true);

  // 코인 정보
  const [info, setInfo] = useState<IInfoData>();
  // 코인 가격
  const [priceInfo, setPriceInfo] = useState<IPriceData>();

  // 코인 정보 + 가격 정보 가져오기
  useEffect(() => {
    (async () => {
      // coin 정보
      const infoData = await (
        await fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`)
      ).json();
      console.log('info : ', infoData);
      // coin 가격 정보
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log('price : ', priceData);

      // data 담아주기
      setInfo(infoData);
      setPriceInfo(priceData);
      // 로딩 상태 변경
      setLoading(false);
    })();
    // [coinId] => coinId가 변한다면 useEffect안의 코드들이 다시 실행!
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : loading ? 'Loading...' : info?.name}</Title>
      </Header>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? 'Yes' : 'No'}</span>
            </OverviewItem>
          </Overview>

          <Description>{info?.description}</Description>

          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
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
          <Outlet />
        </>
      )}
    </Container>
  );
}

export default Coin;

// nico 제작 - coin 정보
// https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}

// interface 데이터 가공 Tip

// Ex.
// 1. console에서 Fetch Data를 확인 -> console.log('info : ', infoData);
// 2. 전역 객체로 저장 -> temp1 변수로 저장
// 3. Object.keys(temp1) -> temp1의 key값만 가져오기  / Object.values(temp1) -> temp1의 Values값만 가져오기

//  Object.keys(temp1)
// 4. Object.keys(temp1).join() -> key값을 문자열로 가져옴

// Object.values(temp1)
// 4. Object.values(temp1).map(v => typeof v) -> temp1의 타입들을 배열로 가져옴
// 5. Object.values(temp1).map(v => typeof v).join() -> temp1의 타입들을 문자열 형태로 가져옴
// 단축키 : option + shift + i

// ?
// info가 존재하는 경우에만 rank를 찾아라
// <span>{info?.rank}</span>
