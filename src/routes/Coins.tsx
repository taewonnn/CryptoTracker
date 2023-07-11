import { Link } from "react-router-dom";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import { useQuery } from "react-query"
import {fetchCoins} from "./api";
import {Helmet} from "react-helmet";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {isDarkAtom} from "../atoms";



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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.textColor};
    }
  }
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

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`

interface CoinInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}



export default function Coins() {


  // React Query
  // useQuery()에는 두 가지 키가 필요하다!  첫번째에는 query의 고유 식별자, 두번째는 fetcher함수!
  // useQuery(고유식별자, fetcher함수)
  const { isLoading, data } = useQuery<CoinInterface[]>(["allCoins"], fetchCoins);
  // fetchCoins 함수가 로딩 중이라면 isloading에서 true / false로 알 수 있다.
  // fetchCoins는 res.json을 return하는데, 모두 완료하면 이 json을  useQuery의 data에 넣어준다!


  // react query 사용 없이 api 통신
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async() => {
  //     const response = await fetch('https://api.coinpaprika.com/v1/coins');
  //     const json = await response.json();
  //     console.log(json);
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   } )();
  //
  // }, [])

  // react query 사용
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom(prev => !prev);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      {isLoading ? <Loader>Loading...</Loader> : <CoinsList>
        {data?.slice(0, 100).map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`} state={coin.name}>
              <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
              {coin.name} &rarr;
            </Link>
          </Coin>
        ))}
      </CoinsList>}
    </Container>
  );


  // 기존 react query 사용 전
  // return (
  //   <Container>
  //     <Header>
  //       <Title>코인</Title>
  //     </Header>
  //     {loading ? <Loader>Loading...</Loader> : <CoinsList>
  //       {coins.map((coin) => (
  //         <Coin key={coin.id}>
  //           <Link to={`/${coin.id}`} state={coin.name}>
  //             <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
  //             {coin.name} &rarr;
  //           </Link>
  //         </Coin>
  //       ))}
  //     </CoinsList>}
  //   </Container>
  // );
}
