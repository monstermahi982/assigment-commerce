"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { increment, decrement } from "../store/slices/counterSlice";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Counter: {count}</h1>
      <button onClick={() => dispatch(increment())} className="mr-2">
        Increment
      </button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </main>
  );
}
