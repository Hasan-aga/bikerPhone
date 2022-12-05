import React, {createContext, useState} from 'react';
export const pathContext = createContext({
  path: [],
  setPath: () => {},
  elevation: [],
  setElevation: () => {},
});

export const PathProvider = ({children}) => {
  const [path, setPath] = useState();
  const [elevation, setElevation] = useState();

  const value = {
    path,
    setPath,
    elevation,
    setElevation,
  };
  return <pathContext.Provider value={value}>{children}</pathContext.Provider>;
};
