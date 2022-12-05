import {ActivityIndicator, Text, View} from 'react-native';
import React from 'react';
export default function Busy({styles}) {
  return (
    <View style={styles.busy}>
      <Text style={styles.busyText}>Fetching data...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
