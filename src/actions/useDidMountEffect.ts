import { useEffect, useRef } from 'react';
/**
 * A hook like useEffect, except it does not activate on the first render
 * @param func - The function useEffect should execute
 * @param deps - The dependency array of useEffect
 */
const useDidMountEffect = (func: () => void, deps: Array<any>, immediate = false): void => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current || immediate) func();
    else didMount.current = true;
  }, deps);
};

export default useDidMountEffect;
