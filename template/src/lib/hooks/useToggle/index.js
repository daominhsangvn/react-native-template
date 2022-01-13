import {useCallback, useState} from 'react';

const useToggle = defaultValue => {
  const [open, setOpen] = useState(defaultValue);
  const toggle = useCallback(() => {
    setOpen(!open);
  }, [open]);
  return {open, toggle};
};
export default useToggle;
