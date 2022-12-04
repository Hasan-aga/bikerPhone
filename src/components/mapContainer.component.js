import {StyleSheet, View, Keyboard} from 'react-native';
import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {darkMap, lightMap} from '../utils/map.theme';
import CustomMarker from './customMarker.component';
const MapContainer = ({coords, useDarkTheme, styles, toggleMapPressed}) => {
  console.log('map coords = ', coords);

  // add temp point to context
  const 

  const [marker, setMarker] = useState({
    coordinate: {
      latitude: coords.latitude,
      longitude: coords.longitude,
    },
    title: 'start here',
    description: 'choose a start point',
  });

  function onPress(input) {
    Keyboard.dismiss();
    toggleMapPressed();
    console.log('input', input.nativeEvent.coordinate);
    setMarker({...marker, coordinate: {...input.nativeEvent.coordinate}});
  }

  return (
    <View style={styles.mapcontainer}>
      <MapView
        style={styles.map}
        //specify our coordinates.
        region={{
          ...coords,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
        customMapStyle={useDarkTheme ? darkMap : lightMap}
        onPress={onPress}
        showsUserLocation={true}
        showsMyLocationButton={false}
        rotateEnabled={false}
        loadingEnabled={true}>
        <CustomMarker
          coordinate={marker.coordinate}
          useDarkTheme={useDarkTheme}
          styles={styles}
        />
      </MapView>
    </View>
  );
};
export default MapContainer;
