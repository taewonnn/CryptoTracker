import {useLocation, useParams} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";

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

interface RouteState {
  state: string;
}


export default function Coin() {

  const [loading, setLoading] = useState(true);

  const [info, setInfo] = useState({});

  const [priceInfo, setPriceInfo] = useState({});

  const {coinId} = useParams()
  console.log(coinId)

  const {state} = useLocation() as RouteState;
  console.log(state);

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      console.log(infoData);
      setInfo(infoData);
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(priceData);
      setPriceInfo(priceData);

    })()
  }, [])


  return (
    <Container>
      <Header>
        <Title>{state ? state : 'Loading'}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
      </Container>
    )
  }



// https://api.coinpaprika.com/v1/coins/btc-bitcoin
// https://api.coinpaprika.com/v1/tickers/btc-bitcoin
