import {StyleSheet, View, Keyboard} from 'react-native';
import React, {useContext, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {darkMap, lightMap} from '../utils/map.theme';
import CustomMarker from './customMarker.component';
import {pointsContext} from '../context/points.context';
import Path from './path.component';
const MapContainer = ({
  coords,
  useDarkTheme,
  styles,
  cardVisible,
  toggleCard,
  setgettingData,
}) => {
  console.log('map rendered at coords = ', coords);

  // add temp point to context
  const [points, setPoints] = useContext(pointsContext);

  const [marker, setMarker] = useState({
    coordinate: {
      latitude: coords.latitude,
      longitude: coords.longitude,
    },
  });

  function onPress(input) {
    Keyboard.dismiss();
    toggleCard();
    if (cardVisible) {
      return;
    }
    setMarker({coordinate: {...input.nativeEvent.coordinate}});
    addTemporaryPoint({
      type: 'temporary',
      coordinate: {...input.nativeEvent.coordinate},
    });
  }

  function addTemporaryPoint(temporaryPoint) {
    setPoints({temporary: temporaryPoint, permanent: points.permanent});
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
        {points.permanent.map((p, index) => (
          <CustomMarker
            key={index}
            coordinate={p.coordinate}
            useDarkTheme={useDarkTheme}
            styles={styles}
          />
        ))}
        {points && <Path setgettingData={setgettingData} />}
      </MapView>
    </View>
  );
};
export default MapContainer;
