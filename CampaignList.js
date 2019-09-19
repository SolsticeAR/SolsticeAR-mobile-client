import React, { Component } from 'react';

import { listCampaigns, setActiveSortMode } from './serverMessages.js';

import { View, Text, FlatList, StyleSheet, TouchableHighlight, Image} from 'react-native';

import OptionsMenu from 'react-native-options-menu';

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
    this.loadCampaigns();
  }

  loadCampaigns() {
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

  switchItems(item) {
    switch (item.type) {
      case "video": return require('./icons/videos.png');
      case "image": return { uri: item.imageUri };
      case "animatedImage": return { uri: item.imageUri };
      case "text": return require('./icons/text.png');
    }
  }

  setSortMode(mode) {
    setActiveSortMode(mode);
    this.loadCampaigns();
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: "column"}}>
        <View style={localStyles.header}>
          <Image style={localStyles.titleHeader}source={require('./icons/header-maybe.png')}></Image>
          <View style={{position: 'absolute', right: 10, top: 10}}>
          <OptionsMenu 
              style={{margin:10}}
              button={require('./icons/hamburger_menu.png')}
              buttonStyle={{width: 30, height: 30, resizeMode: 'contain'}}
              options={["Show All", "Show Top 10", "Show Newest"]}
              actions={[
                () => { this.setSortMode('all') },
                () => { this.setSortMode('top10') },
                () => { this.setSortMode('new') },
              ]}/>
          </View>
        </View>
        <View style={{flex: 1}}>
          {(this.state.isLoaded ? (
              <FlatList
                data={this.state.campaigns}
                renderItem={({ item }) => (
                  <TouchableHighlight onPress={() => { this.onCampaignPress(item.id) }}>
                    <View style={localStyles.buttons}>
                      <View style={localStyles.preview}>
                        <Image source={this.switchItems(item)} style={localStyles.image}/>
                      </View>
                      <Text style={localStyles.text}>{item.name}</Text>
                      <View><Text style={localStyles.typeText}>{item.type}</Text></View>
                      <Text style={localStyles.views}>{(item.views || 0) + " view" + (item.views === 1 ? '' : 's')}</Text>
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
  titleHeader: {
    alignSelf: 'center',
    height: 50,
    width: 275
  },

  // title:{
  //   fontSize: 20,
  //   fontWeight: "500",
  //   color: "#7b4397",	
  //   textAlign: "center",
  //   fontFamily: "Catamaran"
	// },
  views: {
    color:'grey',
    position: "absolute",
    right: 0,
  },
  text: {
    paddingLeft: 70,
    color: "black",
    fontFamily: "Catamaran"
  },
  typeText: {
    paddingLeft: 70,
    color: "grey",
    fontFamily: "Catamaran",
    fontStyle: "italic",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 15,
  },
  preview: {
    height: 50,
    width: 50,
    borderRadius: 15,
    backgroundColor: '#f6f6f6',
    position: "absolute",
    top: 0,
    left: 0,
    shadowColor: '#1e1a75',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 1,
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
    margin: 5,
    marginBottom: 1,
    marginTop: 1,
    shadowColor: '#1e1a75',
    shadowOffset: { width: 5, height: 5 },
  },
});