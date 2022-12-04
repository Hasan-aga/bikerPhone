import React, {createContext, useState} from 'react';
export const pathContext = createContext({
  path: [],
  setPath: () => {},
});

export const PathProvider = ({children}) => {
  const [path, setPath] = useState();

  const value = [path, setPath];

  return <pathContext.Provider value={value}>{children}</pathContext.Provider>;
};
