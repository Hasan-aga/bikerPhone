import {StyleSheet, View, Keyboard} from 'react-native';
import React, {useContext, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {darkMap, lightMap} from '../utils/map.theme';
import CustomMarker from './customMarker.component';
import {pointContext} from '../context/points.context';
const MapContainer = ({coords, useDarkTheme, styles, toggleMapPressed}) => {
  console.log('map coords = ', coords);

  // add temp point to context
  const [points, setPoints] = useContext(pointContext);

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
    addTemporaryPoint({
      type: 'temporary',
      coords: {
        lat: marker.coordinate.latitude,
        lng: marker.coordinate.longitude,
      },
    });
  }

  function addTemporaryPoint(temporaryPoint) {
    const perminantPoints = points.filter(p => p.type !== 'temporary');
    setPoints([...perminantPoints, temporaryPoint]);
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
