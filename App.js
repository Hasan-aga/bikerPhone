/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Card from './src/components/card.component';
import MapContainer from './src/components/mapContainer.component';
import UI from './src/components/ui.component';
import {PathProvider} from './src/context/path.context';
import {PointProvider} from './src/context/points.context';
import useToggle from './src/hooks/toggle.hook';

const App = () => {
  const [coords, setcoords] = React.useState({
    latitude: 52.3727598,
    longitude: 4.8936041,
  });
  const [darkTheme, toggleTheme] = useToggle(false);
  const [cardVisible, toggleCard] = useToggle(false);

  return (
    <View style={styles.home}>
      <PointProvider>
        <PathProvider>
          <MapContainer
            coords={coords}
            useDarkTheme={darkTheme}
            styles={styles}
            cardVisible={cardVisible}
            toggleCard={toggleCard}
          />
          <UI
            styles={styles}
            setcoords={setcoords}
            useDarkTheme={darkTheme}
            setuseDarkTheme={toggleTheme}
          />
          {cardVisible && <Card styles={styles} toggleCard={toggleCard} />}
        </PathProvider>
      </PointProvider>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#f7f7f7',
    color: '#555',
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5000,
    padding: 1,
    elevation: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#555',
    marginLeft: 10,
    marginRight: 5,
    borderRightWidth: 1,
    borderColor: '#999',
  },
  icon: {
    color: '#555',
  },
  yellowIcon: {
    color: '#E9C46A',
  },
  circleButton: {
    backgroundColor: '#fff',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    borderRadius: 100,
    borderWidth: 1,
    marginRight: 2,
  },
  darkCircleButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: '#264653',
    marginRight: 2,
  },
  textAndIconButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    borderRadius: 100,
    borderWidth: 1,
  },
  iconOnlyButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    borderRadius: 100,
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
  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f7f7f7',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%',
    borderRadius: 20,
    paddingTop: 20,
  },
  cardText: {
    color: '#222',
  },
});

export default App;
