import { useState } from 'react';

const useLocalStorageState = (name, defaultValue = null) => {
  const [state, setState] = useState(
    JSON.parse(window.localStorage.getItem(name)) || defaultValue
  );

  const setValue = value => {
    window.localStorage.setItem(name, JSON.stringify(value));
    setState(() => value);
  };

  return [state, setValue];
};

export default useLocalStorageState;
