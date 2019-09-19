import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
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
        <ActivityIndicator style={{margin:50}} size="large" color="#800080"/>
      </View>
    );
  }
}