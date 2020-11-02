import { useState } from 'react';

const useToggle = boolVal => {
  const [boolState, setBoolState] = useState(boolVal);

  const toggleState = valid => {
    if (!valid) return;
    setBoolState(state => !state);
  };

  return [boolState, toggleState];
};

export default useToggle;
