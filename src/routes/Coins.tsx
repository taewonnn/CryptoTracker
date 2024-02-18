import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';

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
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  padding: 20px;
  border: 1px solid white;
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

const ToggleContainer = styled.div`
  height: 30px;
  width: 60px;
  border-radius: 15px;
  padding: 0.25rem;
  display: flex;
  cursor: pointer;
`;

const ToggleBall = styled.div`
  height: 100%;
  width: 50%;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s linear;
`;

/** style End */

// coin data type
interface Icoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: object;
  last_update: string;
}

function Coins() {
  // react Query 적용
  // @tanstack/react-query -> useQuery(['queryKey], fetcher함수, 선택적인 obj)
  // 💡 useQuery는 isLoading이라는 boolean값을 return한다 -> fetcher함수가 끝난다면 fetcher함수에서 return한 json을 data에 저장해준다!
  const { isLoading, data } = useQuery<Icoin[]>(['allcoins'], fetchCoins, {
    // 개발용 -> 첫 번째 요청 이후에 추가 요청을 전송X
    staleTime: Infinity,
  });
  console.log(data);

  // recoil - useRecoilState()
  // value를 설정해주는 함수  React setState함수와 같은 방식으로 작동!
  // useRecoilState(atom) -> atom을 변경하는 함수를 반환해준다.
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => {
    setDarkAtom((prev) => !prev);
  };

  return (
    <Container>
      {/* chrome Tab 제목 */}
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
        <ToggleContainer>
          <ToggleBall onClick={toggleDarkAtom} />
        </ToggleContainer>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.map((coin) => {
            return (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  <Img src={`${coin.image}`} alt="coinImg"></Img>
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
