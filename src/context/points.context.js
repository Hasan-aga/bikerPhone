import {createContext, useState} from 'react';
import React from 'react';

export const pointsContext = createContext({
  points: {
    temporary: {type: 'temporary', coordinate: {latitude: 0, longitude: 0}},
    permanent: [{type: 'permanent', coordinate: {latitude: 0, longitude: 0}}],
  },
  setPoints: () => {},
});

export const PointProvider = ({children}) => {
  const [points, setPoints] = useState({
    temporary: {type: 'temporary', coordinate: {latitude: 0, longitude: 0}},
    permanent: [],
  });

  const value = [points, setPoints];

  return (
    <pointsContext.Provider value={value}>{children}</pointsContext.Provider>
  );
};
