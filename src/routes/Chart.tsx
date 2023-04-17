import {useOutletContext} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchCoinHistory} from "./api";

interface chartProps {
  coinId : string;
}
export default function Chart() {

  const { coinId } = useOutletContext<chartProps>();
  const {isLoading, data} = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId));

  return (
    <h1>Chart</h1>
  )
}
