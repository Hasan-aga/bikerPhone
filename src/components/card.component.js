import {Text, View} from 'react-native';
import React, {useContext} from 'react';
import IconButton from './iconButton.component';
import {pointsContext} from '../context/points.context';
import {pathContext} from '../context/path.context';

export default function Card({styles, toggleCard}) {
  const [points, setPoints] = useContext(pointsContext);
  const [path, setPath] = useContext(pathContext);

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
    setPath([]);
  }

  return (
    <View style={styles.card}>
      {path ? (
        <IconButton
          iconName="close-outline"
          callback={removePoints}
          buttonStyle={styles.deleteTextAndIconButton}
          iconStyle={styles.icon}>
          <Text style={styles.cardText}>Clear All</Text>
        </IconButton>
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
