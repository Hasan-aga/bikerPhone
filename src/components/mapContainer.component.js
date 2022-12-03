import {StyleSheet, View} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';
import Input from './input.component';
const MapContainer = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        //specify our coordinates.
        region={{
          latitude: 52.3727598,
          longitude: 4.8936041,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
      />
    </View>
  );
};
export default MapContainer;

//create our styling code:
const styles = StyleSheet.create({
  container: {
    flex: 1, //the container will fill the whole screen.
  },
  map: {
    flex: 1,
  },
});
