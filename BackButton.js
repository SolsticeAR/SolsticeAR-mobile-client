import React, { Component } from 'react';
import { View, TouchableHighlight, Image} from 'react-native';

export default class BackButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{position: 'absolute', left: 10, top: 10}}>
        <TouchableHighlight onPress={() => {this.props.onChooseCampaignList()}} >
                <Image source={require('./icons/home-button-200x200.png')} style={{width: 30, height: 30, resizeMode: 'contain'}}/>
              </TouchableHighlight>
      </View>);
  }
}