import {ScrollView, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import IconButton from './iconButton.component';
import {pointsContext} from '../context/points.context';
import {pathContext} from '../context/path.context';
import Chart from './chart.component';
import {useElevation} from '../hooks/useElevation.hook';
import ToggleArrow from './ToggleArrow.component';

export default function Card({
  styles,
  toggleCard,
  cardVisible,
  sethightlightPoint,
  gettingData,
}) {
  const [points, setPoints] = useContext(pointsContext);
  const {path, setPath} = useContext(pathContext);
  console.log('getting data=', gettingData);
  function addPoint() {
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

  function clearAll() {
    sethightlightPoint();
    !cardVisible && toggleCard();
    setPoints({permanent: []});
    setPath();
  }

  function getButtonText() {
    return points.permanent.length === 0 ? 'Start here' : 'Add point';
  }

  return (
    <View style={styles.card}>
      {path ? (
        <View style={styles.verticalContainer}>
          <ToggleArrow
            toggle={toggleCard}
            cardVisible={cardVisible}
            styles={styles}
          />
          <IconButton
            iconName="close-outline"
            callback={clearAll}
            buttonStyle={styles.textAndIconButton}
            iconStyle={styles.icon}>
            <Text style={styles.cardText}>Clear All</Text>
          </IconButton>
          {!gettingData && (
            <Chart styles={styles} sethightlightPoint={sethightlightPoint} />
          )}
        </View>
      ) : (
        <>
          <IconButton
            iconName="add-outline"
            callback={addPoint}
            buttonStyle={styles.textAndIconButton}
            iconStyle={styles.icon}>
            <Text style={styles.cardText}>{getButtonText()}</Text>
          </IconButton>
        </>
      )}
    </View>
  );
}
