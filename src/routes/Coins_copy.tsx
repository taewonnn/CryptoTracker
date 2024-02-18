// react-query 사용 전

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  a {
    padding: 20px;
    transition: color 0.3s ease-in;
    /* display: block; */
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 20px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

// coin data type
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
/** style End */

function Coins() {
  // Coin data 가져오기
  const [coins, setCoins] = useState<CoinInterface[]>([]);

  // 로딩
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ...
    // 함수 즉시 실행 가능 트릭 ->
    // (() => console.log(1))();
    (async () => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins');
      const json = await response.json();
      console.log('fetch data 확인', json);
      setCoins(json.slice(0, 100));
      // coin 100개 다 가져오면 loading -> false
      setLoading(false);
    })();
  }, []);

  // 자른 100개 코인목록 확인
  // console.log('100개 ', coins);

  return (
    <Container>
      <Header>
        <Title>Coin</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {coins.map((coin) => {
            return (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{ name: coin.name, rank: coin.rank }}>
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                    alt="coinImg"
                  ></Img>
                  {coin.name} &rarr;
                </Link>
              </Coin>
            );
          })}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;

// 함수 즉시 실행 가능 트릭 ->
// (() => console.log(1))();
