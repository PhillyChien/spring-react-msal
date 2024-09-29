import LoginButton from "./components/LoginButton";
import { useAppSelector, useAppDispatch } from "./redux/hook";
import {
  decrement,
  increment,
  selectCounter,
} from "./redux/slices/counter-slice";

function Counter() {
  const counter = useAppSelector(selectCounter);
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col items-center font-bold text-3xl">
      <h1 className="my-10">Counter: {counter}</h1>
      <p className="flex items-center justify-between min-w-60">
        <button
          className="border-solid border-black border-2 py-3 px-10 "
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className="border-solid border-black border-2 py-3 px-10"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Counter />
      <LoginButton />
    </div>
  );
}

export default App;
