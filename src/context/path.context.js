import React, {createContext, useContext, useState} from 'react';
export const pathContext = createContext({
  path: [],
  setPath: () => {},
  elevation: [],
  setElevation: () => {},
  legs: [],
});

export const PathProvider = ({children}) => {
  const [paths, setPaths] = useState();
  const [elevation, setElevation] = useState();

  const value = {
    paths,
    setPaths,
    elevation,
    setElevation,
  };
  return <pathContext.Provider value={value}>{children}</pathContext.Provider>;
};
