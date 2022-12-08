import {StyleSheet, View, Keyboard} from 'react-native';
import React, {useContext, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {darkMap, lightMap} from '../utils/map.theme';
import CustomMarker from './customMarker.component';
import {pointsContext} from '../context/points.context';
import Path from './path.component';
import {pathContext} from '../context/path.context';
import useGetCoordinates from '../utils/getCoordinatesFromDistance';
import {useElevation} from '../hooks/useElevation.hook';
const MapContainer = ({
  coords,
  useDarkTheme,
  styles,
  cardVisible,
  toggleCard,
  setgettingData,
  hightlightPoint,
}) => {
  console.log('map rendered at coords = ', coords);

  // add temp point to context
  const [points, setPoints] = useContext(pointsContext);
  const {path, setPath, setElevation} = useContext(pathContext);

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
        customMapStyle={styles.mapTheme}
        onPress={onPress}
        showsUserLocation={true}
        showsMyLocationButton={false}
        rotateEnabled={false}
        loadingEnabled={false}>
        <CustomMarker
          coordinate={marker.coordinate}
          styles={styles}
          title="temporary marker"
        />
        {hightlightPoint && (
          <CustomMarker
            coordinate={hightlightPoint.coordinate}
            styles={styles}
            title="highlight"
          />
        )}
        {points.permanent.map((p, index) => (
          <CustomMarker
            key={index}
            coordinate={p.coordinate}
            styles={styles}
            title="permanent marker"
          />
        ))}
        {points && (
          <Path
            setgettingData={setgettingData}
            path={path}
            setPath={setPath}
            setElevation={setElevation}
          />
        )}
      </MapView>
    </View>
  );
};
export default MapContainer;
