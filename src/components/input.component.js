import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {getCoordsFromName} from '../utils/getCoordsFromName';

export default function Input({style, setcoords, placeholder = 'Type here'}) {
  const [query, setQuery] = React.useState('default');

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
    <TextInput
      editable={true}
      style={style}
      placeholder={placeholder}
      onSubmitEditing={onSubmit}
      placeholderTextColor="#888"
    />
  );
}
