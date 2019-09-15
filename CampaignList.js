import React, { Component } from 'react';

import { listCampaigns } from './serverMessages.js';

import { View, Text } from 'react-native';

export default class CampaignList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      isLoaded: false,
      campaigns: [],
    };
  }

  componentDidMount() {
    listCampaigns().then(response => {
      this.setState({
        isLoaded: true, 
        message: JSON.stringify(response) });
    });
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: "column"}}>
        <View style={{height: 50}}>
          <Text>List of campaigns</Text>
        </View>
        <View style={{height: 50}}>
          <Text>{this.state.message}</Text>
        </View>
        <View style={{flex: 1}}>
          {(this.state.isLoaded ? (
            <Text>TODO: show campaigns</Text>
          ) : (
            <Text>Loading...</Text>
          ))}
        </View>
      </View>
    );
  }
}