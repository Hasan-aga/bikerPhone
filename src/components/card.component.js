import {ScrollView, Text, View} from 'react-native';
import React, {useContext} from 'react';
import IconButton from './iconButton.component';
import {pointsContext} from '../context/points.context';
import {pathContext} from '../context/path.context';
import Chart from './chart.component';

export default function Card({styles, toggleCard}) {
  const [points, setPoints] = useContext(pointsContext);
  const {path, setPath, elevation} = useContext(pathContext);

  console.log('elevation: ', elevation);

  function addPoint() {
    toggleCard();
    console.log('adding new point, total points= ', points.permanent.length);
    const desiredPoint = points.temporary;
    const newPermanentPoint = {
      ...desiredPoint,
      type: 'permanent',
    };
    console.log('new perm point: ', newPermanentPoint);
    if (points.permanent && points.permanent.includes(newPermanentPoint)) {
      return;
    }
    const newPoints = [...points.permanent, newPermanentPoint];
    setPoints({temporary: points.temporary, permanent: newPoints});
  }

  function removePoints() {
    toggleCard();
    setPoints({permanent: []});
    setPath();
  }

  return (
    <View style={styles.card}>
      {path ? (
        <View style={styles.verticalContainer}>
          <ScrollView horizontal={true} style={styles.horizontalScroll}>
            <IconButton
              iconName="close-outline"
              callback={removePoints}
              buttonStyle={styles.deleteTextAndIconButton}
              iconStyle={styles.icon}>
              <Text style={styles.cardText}>Clear All</Text>
            </IconButton>
          </ScrollView>
          <Chart styles={styles} data={elevation} />
        </View>
      ) : (
        <>
          <IconButton
            iconName="add-outline"
            callback={addPoint}
            buttonStyle={styles.textAndIconButton}
            iconStyle={styles.icon}>
            <Text style={styles.cardText}>Start here</Text>
          </IconButton>
          <IconButton
            iconName="add-outline"
            callback={addPoint}
            buttonStyle={styles.textAndIconButton}
            iconStyle={styles.icon}>
            <Text style={styles.cardText}>Set as destination</Text>
          </IconButton>
        </>
      )}
    </View>
  );
}
