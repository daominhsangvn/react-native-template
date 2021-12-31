import {useState} from 'react';

const useToggle = defaultValue => {
  const [open, setOpen] = useState(defaultValue);
  const toggle = () => {
    setOpen(!open);
  };
  return {open, toggle};
};
export default useToggle;
