import {Text, View} from 'react-native';
import React, {useContext} from 'react';
import IconButton from './iconButton.component';
import {pointContext} from '../context/points.context';

export default function Card({styles}) {
  function addPoint() {
    console.log('adding a point in ', points);
    const desiredPoint = points.find(p => p.type === 'temporary');
    desiredPoint.type = 'perminant';
    const perminantPoints = points.filter(p => p.type !== 'temporary');
    perminantPoints.push(desiredPoint);
    setPoints(perminantPoints);
  }

  // view all points in context
  // there should be only one temporary point
  // change its type to perminant
  // get a list of all other perminant points
  // update the points context with the new point + all perminant points
  const [points, setPoints] = useContext(pointContext);

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
