import React, { Component } from 'react';

import { listCampaigns } from './serverMessages.js';

import { View, Text, FlatList, StyleSheet, TouchableHighlight} from 'react-native';

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
    this.props.onChooseCampaign(id);
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: "column"}}>
        <View style={localStyles.header}>
          <Text style={localStyles.title}>Top AR Experiences</Text>
        </View>
        {/* <View style={{height: 25, backgroundColor: '#1e1a75'}}>
          <Text style={{color:"white"}}>{this.state.message}</Text>
        </View> */}
        <View style={{flex: 1}}>
          {(this.state.isLoaded ? (
              <FlatList
                data={this.state.campaigns}
                renderItem={({ item }) => (
                  <TouchableHighlight onPress={() => { this.onCampaignPress(item.id) }}>
                    <View style={localStyles.buttons}>
                      <View style={localStyles.preview}>
                      </View>
                      <Text style={localStyles.text}>{item.name}</Text>
                      <Text style={localStyles.views}>{item.views + " views"}</Text>
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

const localStyles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    height: 50,
    shadowColor: '#1e1a75',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 2,
  },
  title:{
    fontSize: 20,
    fontWeight: "500",
    color: "#7b4397",	
    textAlign: "center"
	},
  views: {
    color:'grey',
    position: "absolute",
    right: 0,
  },
  text: {
    paddingLeft: 80,
    color: "black"
  },
  preview: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#343a40',
    position: "absolute",
    top: 0,
    left: 0,
  },
  previewText: {
    fontSize: 10,
    fontWeight: "400",
    textAlign: "center",
    color: "white"
  },
  buttons : {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 14,
    margin: 15,
    marginBottom: 1,
    marginTop: 1,
    shadowColor: '#1e1a75',
    shadowOffset: { width: 5, height: 5 },
  },
});