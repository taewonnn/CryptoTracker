const BASE_URL = `https://api.coinpaprika.com/v1`

export function fetchCoins () {
  return (
  fetch(`${BASE_URL}/coins`).then(response => response.json())

  );
}


export function fetchCoinInfo (coinId: string | undefined) {
  return (
    fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json())

  );
}


export function fetchCoinTickers (coinId: string | undefined) {
  return (
    fetch(`${BASE_URL}/tickers/${coinId}`).then(response => response.json())

  );
}




// Chart
export function fetchCoinHistory(coinId: string) {

  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;

  return (
    fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}&start=${startDate}&end=${endDate}`).then(response => response.json())
  );
}


// react - query
// queryClient 생성

// 1. fetcher function 생성  - api.ts
// fetch 함수는 promise를 return 해줘야한다

export async function fetchCoins1() {

  // 코드가 길어졌음
  // const response = await fetch(`${BASE_URL}/coins`)
  // const json = await response.json();
  // return json;

  // promise 방식으로 위에 코드를 짧게
  return fetch(`${BASE_URL}/coins`)
    .then((res) => res.json);


}




// https://ohlcv-api.nomadcoders.workers.dev?coinId=btc-bitcoin
