/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';

import { VIRO_API_KEY } from 'react-native-dotenv';

import CampaignList from './CampaignList.js';
import LoadArInfoScreen from './LoadArInfoScreen.js';

import { setActiveExperienceData } from "./globalExperience.js";

// Sets the default scene you want for AR and VR
const InitialARScene = require('./js/HelloWorldSceneAR');

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      activeCampaignId: 0,
      testMessage: "...",
      navigatorType: "LIST",
      scene: null
    }
  }

  onLoadComplete(data) {
    setActiveExperienceData(data);
    this.setState({ 
      activeCampaignId: data.id, 
      navigatorType: 'AR'
     });
  }

  onChooseCampaign(id) {
    this.setState({ activeCampaignId: id, navigatorType: 'LOADING' });
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == "LIST") {
      return (
        <CampaignList 
          onChooseCampaign={(id) => {this.onChooseCampaign(id)}}
          />
      );
    } else if (this.state.navigatorType == 'LOADING') {
      return (
        <LoadArInfoScreen 
          campaignId={this.state.activeCampaignId} 
          onLoadComplete={(data) => {this.onLoadComplete(data)}}
          />
      );
    } else if (this.state.navigatorType == 'AR') {
      return (
        <View style={{flex: 1, flexDirection: "column"}}>
          <View style={{height: 50}}><Text>TODO: put a back button here and/or some title information.</Text></View>
          <View style={{flex: 1}}>
            <ViroARSceneNavigator apiKey={VIRO_API_KEY}
              initialScene={{scene: InitialARScene}} />
          </View>
        </View>
      );
    } else {
      return (<Text>Invalid navigator type</Text>);
    }
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports = ViroSample
