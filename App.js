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
import {getStyles} from './src/utils/getStyles';

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
                cardVisible={cardVisible}
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

export default App;
