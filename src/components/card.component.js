import {Text, View} from 'react-native';
import React, {useContext} from 'react';
import IconButton from './iconButton.component';
import {pointsContext} from '../context/points.context';

export default function Card({styles}) {
  // view all points in context
  // there should be only one temporary point
  // change its type to perminant
  // get a list of all other perminant points
  // update the points context with the new point + all perminant points
  const [points, setPoints] = useContext(pointsContext);

  function addPoint() {
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
  return (
    <View style={styles.card}>
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
    </View>
  );
}
