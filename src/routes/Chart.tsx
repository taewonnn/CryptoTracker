import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import { useOutletContext } from 'react-router-dom';
import ApexCharts from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

/** interface Start */
interface IChartProps {
  coinId: string;
}

interface IChartPrice {
  0: number; // time
  1: number; // open
  2: number; // high
  3: number; // low
  4: number; // clos
}
/** interface End */

function Chart() {
  // coinId 받기 - useOutletContext
  // useOutletContext : Outlet component 상황에 대한 context를 전달하는 데 사용
  // console.log(useOutletContext());
  const { coinId } = useOutletContext<IChartProps>();

  // useQuery
  const { isLoading, data } = useQuery<IChartPrice[]>(
    ['chartPrice', coinId],
    () => fetchCoinHistory(coinId),
    {
      // 개발용 -> 첫 번째 요청 이후에 추가 요청을 전송X
      staleTime: Infinity,
    }
  );
  // console.log('chartPrice : ', data);

  // high / low 가격 필터
  let highAndLowValues = data?.map((item) => {
    return {
      high: item[2], // high is at index 2
      low: item[3], // low is at index 3
    };
  });
  // console.log('high:', highAndLowValues);

  // recoil - darkmode
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        'Loading Chart...'
      ) : (
        <ApexCharts
          type="line"
          series={[
            // data 넣는 예시
            // { name: 'hello', data: [1, 2, 3] },
            // data가 null이 되는걸 방지하기 위해 ?? [] -> null 대신 빈 배열로 바꿔주기
            {
              name: 'High prices',
              data: highAndLowValues?.map((value) => value.high) ?? [],
            },
            {
              name: 'Low prices',
              data: highAndLowValues?.map((value) => value.low) ?? [],
            },
          ]}
          options={{
            theme: { mode: isDark ? 'dark' : 'light' },
            chart: { height: 500, width: 500, toolbar: { show: false } },
            stroke: { curve: 'smooth', width: 3 },
            fill: { type: 'gradient', gradient: { gradientToColors: ['blue'], stops: [0, 100] } },
            colors: ['red'],
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: { show: false },
              type: 'datetime',
              // timestmap 변환  * Date 객체는 밀리초 단위를 사용하므로, 타임스탬프를 1000으로 곱
              categories: data?.map((price) =>
                new Date(price[0] /* timestamp */ * 1000).toISOString()
              ),
            },
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
