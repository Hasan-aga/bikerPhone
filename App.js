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

const App = () => {
  const [coords, setcoords] = React.useState();
  return (
    <View style={styles.home}>
      <MapContainer />
      <UI styles={styles} />
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
  input: {
    elevation: 100,
    backgroundColor: '#f7f7f7',
    color: '#555',
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    borderRadius: 5000,
    padding: 10,
  },
});

export default App;
