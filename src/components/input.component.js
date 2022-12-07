import {ActivityIndicator, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {getCoordsFromName} from '../utils/getCoordsFromName';
import TouchIcon from './touchIcon.component';
import LocationButton from './locationButton.component';
import IconButton from './iconButton.component';
import IconOrBusy from './IconOrBusy.component';

export default function Input({styles, setcoords, placeholder = 'Type here'}) {
  const [query, setQuery] = React.useState();
  const [queryForIconButton, setqueryForIconButton] = React.useState('default');
  const [isBusy, setisBusy] = React.useState(false);

  function onSubmit(input) {
    setQuery(input.nativeEvent.text);
  }

  React.useEffect(() => {
    async function runQuery(searchValue) {
      try {
        if (!query || query.length === 0) {
          return;
        }
        setisBusy(true);
        const coords = await getCoordsFromName(searchValue);
        if (!coords) {
          throw new Error('no coordinates!');
        }
        setcoords(coords);
        setisBusy(false);
      } catch (error) {
        setisBusy(false);
        console.error(error);
      }
    }

    runQuery(query);
  }, [query, setcoords]);

  return (
    <View style={styles.bar}>
      <TextInput
        editable={true}
        style={styles.input}
        placeholder={placeholder}
        onSubmitEditing={onSubmit}
        onChangeText={setqueryForIconButton}
        placeholderTextColor="#888"
        returnKeyType="search"
      />

      <IconOrBusy
        isBusy={isBusy}
        iconName="search-outline"
        buttonStyle={styles.iconOnlyButton}
        iconStyle={styles.icon}
      />
    </View>
  );
}
