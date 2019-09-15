import React, { Component } from 'react';

import { listCampaigns } from './serverMessages.js';

import { View, Text, FlatList, TouchableHighlight } from 'react-native';

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
        message: "Loaded.",
        campaigns: response.data.campaigns });
    });
  }

  onCampaignPress(id) {
    this.setState({
      message: "You clicked on campaign ID#: " + id,
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
              <FlatList
                data={this.state.campaigns}
                renderItem={({ item }) => (
                  <TouchableHighlight onPress={() => { this.onCampaignPress(item.id) }}>
                    <View style={{height: 50}}>
                      <Text>{item.name}</Text>
                    </View>
                  </TouchableHighlight>)}
                keyExtractor={item => ('' + item.id)}
              />
          ) : (
            <Text>Loading...</Text>
          ))}
        </View>
      </View>
    );
  }
}