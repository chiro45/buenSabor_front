import { useState } from "react";

export interface Counters {
  [productId: number]: number;
}

export interface CounterActions {
    increment: (productId: number, value?: number) => void;
    decrement: (productId: number, value?: number) => void;
    reset: (productId: number) => void;
    addProduct: (productId: number, initialValue?: number) => void;
  }
  
export const useCounter = (): [Counters, CounterActions] => {
  const [counters, setCounters] = useState<Counters>({});

  const increment = (productId: number, value: number = 1) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [productId]: (prevCounters[productId] || 0) + value
    }));
  };

  const decrement = (productId: number, value: number = 1) => {
    if (counters[productId] > 1) {
      setCounters((prevCounters) => ({
        ...prevCounters,
        [productId]: (prevCounters[productId] || 0) - value
      }));
    }
  };

  const reset = (productId: number) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [productId]: 1
    }));
  };

  const addProduct = (productId: number, initialValue: number = 1) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [productId]: initialValue
    }));
  };
  const counterActions: CounterActions = {
    increment,
    decrement,
    addProduct,
    reset
  };

  return [counters, counterActions];
};
