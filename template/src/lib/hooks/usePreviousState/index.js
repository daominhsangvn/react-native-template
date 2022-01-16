import React, {useState} from 'react';
import {usePrevious} from 'react-use';

const usePreviousState = defaultValue => {
  const [value, setValue] = useState(defaultValue);
  const previousValue = usePrevious(value);

  return [value, setValue, previousValue];
};

export default usePreviousState;
