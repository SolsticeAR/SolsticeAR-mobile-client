import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class Splash extends Component {
  
  constructor(props) {
    super(props);
  }
  
  onCampaignPress(id) {
    this.props.onChooseCampaignList();
  }

  render() {
    return (
      <View>
        <View style={{height: 50}}>
          <Text>Oi Oi this is a splash page, test me</Text>
        </View>
        <View>
          <TouchableHighlight onPress={() => { this.onCampaignPress() }}>
              <View>
                <Text>TEST ME</Text>
              </View>
            </TouchableHighlight>
        </View>
      </View>
    );
  }
}
