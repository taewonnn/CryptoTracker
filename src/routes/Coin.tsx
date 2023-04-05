import {useLocation, useParams} from "react-router-dom";
import styled from "styled-components";
import {useState} from "react";

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

  const {coinId} = useParams()
  console.log(coinId)

  const {state} = useLocation() as RouteState;
  console.log(state);

  return (
    <Container>
      <Header>
        <Title>{state ? state : 'Loading'}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
      </Container>
    )
  }

