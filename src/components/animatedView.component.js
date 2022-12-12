import React from 'react';
import {View} from 'react-native';

export class AnimatedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: 'red'};
  }
  render() {
    return <View pointerEvents="box-none">{this.props.children}</View>;
  }
}
