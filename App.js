/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import MapContainer from './src/components/mapContainer.component';
import UI from './src/components/ui.component';
import useToggle from './src/hooks/toggle.hook';

const App = () => {
  const [coords, setcoords] = React.useState({
    latitude: 52.3727598,
    longitude: 4.8936041,
  });
  const [darkTheme, toggleTheme] = useToggle(false);
  return (
    <View style={styles.home}>
      <MapContainer coords={coords} useDarkTheme={darkTheme} />
      <UI
        styles={styles}
        setcoords={setcoords}
        useDarkTheme={darkTheme}
        setuseDarkTheme={toggleTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    position: 'relative',
  },
  ui: {
    flex: 1,
    position: 'absolute',
    top: 10,
    width: '90%',
  },
  bar: {
    flex: 6,
    backgroundColor: '#f7f7f7',
    color: '#555',
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5000,
    padding: 1,
    elevation: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: '#555',
    width: '80%',
    marginLeft: 10,
    marginRight: 5,
    borderRightWidth: 1,
    borderColor: '#999',
  },
  icon: {
    color: '#555',
  },
  circleButton: {
    backgroundColor: '#fff',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    borderRadius: 100,
    borderWidth: 1,
  },
  halfCircularButton: {
    ...this.circleButton,
    backgroundColor: 'red',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
