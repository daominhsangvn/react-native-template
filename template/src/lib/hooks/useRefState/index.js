import {useEffect, useRef, useState} from 'react';

const useRefState = initialValue => {
  const [state, setState] = useState(initialValue);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  return [state, setState, stateRef];
};

export default useRefState;