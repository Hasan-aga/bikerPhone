/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Appearance,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import BottomUi from './src/components/bottomUi.component';
import Busy from './src/components/busy.component';
import Card from './src/components/card.component';
import InfoCard from './src/components/infoCard.component';
import MapContainer from './src/components/mapContainer.component';
import Test from './src/components/test.component';
import TopUi from './src/components/topUi.component';
import {pathContext, PathProvider} from './src/context/path.context';
import {PointProvider} from './src/context/points.context';
import useToggle from './src/hooks/toggle.hook';
import useStorage from './src/hooks/useStorage.hook';
import {darkMap, lightMap} from './src/utils/map.theme';

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const isDark = colorScheme === 'light' ? 'false' : 'true';
  const [coords, setcoords] = React.useState({
    latitude: 52.3727598,
    longitude: 4.8936041,
  });
  const [darkTheme, toggleTheme] = useToggle(isDark);
  const [cardVisible, toggleCard] = useToggle(false);
  const [gettingData, setgettingData] = useState(false);
  const [hightlightPoint, sethightlightPoint] = useState();
  const styles = getStyles(darkTheme);
  const {getObject} = useStorage();

  useEffect(() => {
    async function getStoredLocation() {
      try {
        const location = await getObject('@coords');
        console.log('location:::', location);
        if (!location || !location.latitude || !location.longitude) {
          return;
        }
        setcoords(location);
      } catch (error) {
        console.log(error);
      }
    }

    getStoredLocation();
  }, []);

  return (
    <View style={styles.home}>
      <PointProvider>
        <PathProvider>
          <MapContainer
            coords={coords}
            styles={styles}
            setgettingData={setgettingData}
            hightlightPoint={hightlightPoint}
          />
          <TopUi
            styles={styles}
            setcoords={setcoords}
            useDarkTheme={darkTheme}
            setuseDarkTheme={toggleTheme}
          />
          <BottomUi styles={styles}>
            {/* <Test styles={styles} sethightlightPoint={sethightlightPoint} /> */}
            {
              <Card
                styles={styles}
                toggleCard={toggleCard}
                sethightlightPoint={sethightlightPoint}
                gettingData={gettingData}
              />
            }
            <InfoCard
              isVisible={gettingData}
              styles={styles}
              message={<Busy styles={styles} />}
            />
          </BottomUi>
        </PathProvider>
      </PointProvider>
    </View>
  );
};

function getStyles(isDark) {
  const primaryColor = isDark ? '#264653' : '#f7f7f7';
  const highLightColor = isDark ? '#F9C46A' : '#555';
  const softColor = isDark ? '#2f2715' : '#999';
  const styles = {
    highLightColor,
    primaryColor,
    softColor,
    home: {
      flex: 1,
      position: 'relative',
    },
    mapcontainer: {
      flex: 1, //the container will fill the whole screen.
    },
    map: {
      flex: 1,
    },
    mapTheme: isDark ? darkMap : lightMap,
    ui: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 10,
    },
    bar: {
      flex: 0.9,
      backgroundColor: primaryColor,
      color: highLightColor,
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderRadius: 5000,
      padding: 1,
      elevation: 100,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: softColor,
    },
    input: {
      flex: 1,
      color: highLightColor,
      marginLeft: 10,
      marginRight: 5,
      borderRightWidth: 1,
      borderColor: softColor,
    },
    icon: {
      color: highLightColor,
      paddingLeft: 5,
      paddingRight: 5,
    },

    circleButton: {
      backgroundColor: primaryColor,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 1,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: softColor,
      marginRight: 2,
    },

    textAndIconButton: {
      flexDirection: 'row',
      backgroundColor: primaryColor,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 10,
      margin: 10,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: softColor,
    },

    iconOnlyButton: {
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },

    callout: {
      flexDirection: 'row',
      backgroundColor: '#f7f7f7',
      padding: 10,
      borderWidth: 1,
      borderRadius: 100,
      color: '#222',
      margin: 1,
    },
    calloutText: {
      alignSelf: 'center',
    },
    bottomUi: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      alignItems: 'center',
    },
    card: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      backgroundColor: primaryColor,
      bottom: 0,
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    cardText: {
      color: highLightColor,
    },

    chartContainer: {flex: 4},
    verticalContainer: {
      alignItems: 'flex-end',
      backgroundColor: primaryColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 10,
    },
    chart: {
      height: 200,
      width: 'auto', // width is set to screen.width in component
      backgroundColor: primaryColor,
      alignSelf: 'center',
    },
    horizontalScroll: {
      backgroundColor: 'red',
    },
    infoCard: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 1,
      width: '100%',
    },
    busy: {
      backgroundColor: primaryColor,
      borderRadius: 100,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 100,
      width: '50%',
      borderColor: softColor,
      borderWidth: 1,
    },
    busyText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: highLightColor,
    },
    highlightChart: {
      backgroundColor: 'rgba(3, 166, 74, 0.3)',
      height: '95%',
      zIndex: 1000,
      position: 'absolute',
      bottom: 10,
      justifyContent: 'center',
    },
    highlightText: {
      opacity: 1,
      backgroundColor: highLightColor,
      alignSelf: 'center',
      width: 110,
      borderRadius: 100,
      borderWidth: 1,
      paddingLeft: 5,
      fontSize: 13,
    },
  };

  return styles;
}

export default App;
