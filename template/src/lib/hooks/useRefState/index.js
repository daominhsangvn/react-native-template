import {useCallback, useRef, useState} from 'react';

const useRefState = initialValue => {
  const [state, setState] = useState(initialValue);
  const stateRef = useRef(state);

  const _setState = useCallback(newSate => {
    stateRef.current = newSate;
    setState(newSate);
  }, []);

  // useEffect(() => {
  //   stateRef.current = state;
  // }, [state]);

  return [state, _setState, stateRef];
};

export default useRefState;
