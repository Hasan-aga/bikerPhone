import {useState} from 'react';

export default function useToggle(initialState = false) {
  const [state, setstate] = useState(initialState);
  function toggleState() {
    setstate(!state);
  }
  return [state, toggleState];
}
