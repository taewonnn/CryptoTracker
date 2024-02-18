import { atom } from 'recoil';

/**
💡 Atom은 상태(state)의 일부를 나타낸다. Atoms는 어떤 컴포넌트에서나 읽고 쓸 수 있다.
atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독한다.
그래서 atom에 어떤 변화가 있으면 그 atom을 구독하는 모든 컴포넌트들이 리렌더링 되는 결과가 발생할 것이다.

Ex.
const textState = atom({
  key: 'textState', // 유니크한 ID(다른 atom/selector와 관련하여)
  default: '', // 기본값 (초기값)
});

useRecoilState()
컴포넌트가 atom을 읽고 쓰게 하기 위해서는 useRecoilState()를 아래와 같이 사용
ex) const [text, setText] = useRecoilState(textState);
*/

export const isDarkAtom = atom({
  key: 'isDark',
  default: true,
});
