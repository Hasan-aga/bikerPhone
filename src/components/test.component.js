import {ScrollView, Text, useWindowDimensions, View} from 'react-native';
import React, {useContext, useState} from 'react';
import IconButton from './iconButton.component';
import {pointsContext} from '../context/points.context';
import {pathContext} from '../context/path.context';
import Chart from './chart.component';
import {useModifiedElevation} from '../hooks/useModifiedElevation.hook';

export default function Test({styles}) {
  //TODO: remove this component
  console.log('tessst');
  const {height, width} = useWindowDimensions();
  styles.verticalContainer.width = width;

  return (
    <View style={styles.card}>
      <View style={styles.verticalContainer}>
        <IconButton
          iconName="close-outline"
          callback={() => {}}
          buttonStyle={styles.deleteTextAndIconButton}
          iconStyle={styles.icon}>
          <Text style={styles.cardText}>Clear All</Text>
        </IconButton>
        <Chart styles={styles} />
      </View>
    </View>
  );
}
