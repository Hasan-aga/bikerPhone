import {createContext, useState} from 'react';
import React from 'react';

export const pointContext = createContext({
  points: [{type: 'temporary', coordinate: {latitude: 0, longitude: 0}}],
  setPoints: () => {},
});

export const PointProvider = ({children}) => {
  const [points, setPoints] = useState([
    {type: 'temporary', coords: {lat: 0, lng: 0}},
  ]);

  const value = [points, setPoints];

  return (
    <pointContext.Provider value={value}>{children}</pointContext.Provider>
  );
};
