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

var sharedProps = {
  apiKey: VIRO_API_KEY,
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/HelloWorldSceneAR');

var UNSET = "UNSET";
var AR_NAVIGATOR_TYPE = "AR";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      activeCampaignId: 0,
      testMessage: "...",
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps
    }
  }

  onLoadComplete(data) {
    this.setState({ activeCampaignId: data.id, navigatorType: 'AR' });
  }

  onChooseCampaign(id) {
    this.setState({ activeCampaignId: id, navigatorType: 'LOADING' });
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
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
        <ViroARSceneNavigator {...this.state.sharedProps}
          initialScene={{scene: InitialARScene}} />
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
