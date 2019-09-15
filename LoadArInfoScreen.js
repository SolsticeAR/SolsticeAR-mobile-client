import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { getCampaign } from './serverMessages.js';

export default class LoadArInfoScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      message: "Loading...",
    };
  }
  
  componentDidMount() {
    getCampaign(this.props.campaignId).then(response => {
      this.props.onLoadComplete(response.data.campaign);
    });
  }

  render() {
    return (
      <View>
        <Text>{this.state.message}</Text>
      </View>
    );
  }
}