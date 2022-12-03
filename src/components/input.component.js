import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {getCoordsFromName} from '../utils/getCoordsFromName';
import IconButton from './iconButton.component';
import LocationButton from './locationButton.component';

export default function Input({styles, setcoords, placeholder = 'Type here'}) {
  const [query, setQuery] = React.useState('default');
  const [queryForIconButton, setqueryForIconButton] = React.useState('default');

  function onSubmit(input) {
    console.log(input.nativeEvent.text);
    setQuery(input.nativeEvent.text);
  }

  React.useEffect(() => {
    async function runQuery(searchValue) {
      try {
        if (query === 'default') {
          return;
        }
        const coords = await getCoordsFromName(searchValue);
        if (!coords) {
          throw new Error('no coordinates!');
        }
        console.log(`coords for ${searchValue} is ${coords}`);
        setcoords(coords);
      } catch (error) {
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
      />
      {/* <LocationButton styles={styles} /> */}
      <IconButton
        callback={() => {
          console.log(`searhing for ${queryForIconButton}`);
          onSubmit({nativeEvent: {text: queryForIconButton}});
        }}
        iconName="search-outline"
        styles={styles}
      />
    </View>
  );
}
