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
  Image
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';

import { VIRO_API_KEY } from 'react-native-dotenv';

import CampaignList from './CampaignList.js';
import LoadArInfoScreen from './LoadArInfoScreen.js';
import Splash from './Splash.js';

import { setActiveExperienceData } from "./globalExperience.js";

// Sets the default scene you want for AR and VR
const InitialARScene = require('./js/ARScene.js');

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      activeCampaignId: 0,
      testMessage: "...",
      navigatorType: "SPLASH",
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

  onChooseCampaignList(optionalArg) {
    this.setState({ navigatorType: "LIST"});
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == "SPLASH") {
    return ( <Splash onChooseCampaignList={(optionalArg) => {this.onChooseCampaignList(optionalArg)}}/>)
    }
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
            <TouchableHighlight onPress={() => {this.onChooseCampaignList()}} style={{flexDirection: "row-reverse", backgroundColor:"black"}}>
              <Image source={require('./icons/home-button-white.png')} style={{height: 50, width: 50}}/>
            </TouchableHighlight>
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
  backButton :{
    
  }
});

module.exports = ViroSample
