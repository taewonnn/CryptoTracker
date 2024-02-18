// React Qyery
// 1.fetcher 함수 -> fetch promise를 return

// BASE_URL
const BASE_URL = `https://api.coingecko.com/api/v3/coins`;

// coin 목록
export function fetchCoins() {
  // promise 방식
  return fetch(`${BASE_URL}/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`).then(
    (response) => response.json()
  );
}

// coin 정보
export function fetchCoinInfo(coinId: string | undefined) {
  return fetch(`${BASE_URL}/${coinId}?localization=false`).then((response) => response.json());
}

// coin 가격 기록
export function fetchCoinHistory(coinId: string | undefined) {
  // const days = new Date();
  return fetch(`${BASE_URL}/${coinId}/ohlc?vs_currency=krw&days=1`).then((response) =>
    response.json()
  );
}

// coin tickers
// export function fetchCoinTickers(coinId: string | undefined) {
//   return fetch(`${BASE_URL}/${coinId}/tickers`).then((response) => response.json());
// }
