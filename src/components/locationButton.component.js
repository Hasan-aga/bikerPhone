import {
  TouchableHighlight,
  View,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import IconButton from './iconButton.component';

// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default function LocationButton({styles, setCoords}) {
  const [location, setLocation] = React.useState(false);
  const [isBusy, setisBusy] = React.useState(false);

  // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        setisBusy(true);
        Geolocation.getCurrentPosition(
          position => {
            setisBusy(false);
            console.log(position);
            setLocation(position);
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setCoords(coords);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };

  return (
    <View style={styles.circleButton}>
      {isBusy ? (
        <ActivityIndicator />
      ) : (
        <IconButton
          styles={styles}
          callback={getLocation}
          iconName="locate-outline"
        />
      )}
    </View>
  );
}
