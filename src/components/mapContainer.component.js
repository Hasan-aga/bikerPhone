import {StyleSheet, View} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';
const MapContainer = ({coords}) => {
  console.log('map coords = ', coords);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        //specify our coordinates.
        region={{
          ...coords,
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
