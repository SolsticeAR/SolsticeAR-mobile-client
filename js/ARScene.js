'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import { getActiveExperienceData } from '../globalExperience.js';

import {
  ViroARScene,
  ViroImage,
  ViroText,
  ViroVideo,
  ViroConstants,
} from 'react-viro';

export default class ARScene extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      isInitialised: false,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    let data = getActiveExperienceData();
    let type = this.state.isInitialised ? data.type : "initialising";

    switch(type) {
      case "initialising":
        return (
          <ViroARScene onTrackingUpdated={this._onInitialized} >
          <ViroText text={"Initialising..."} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        </ViroARScene>
        );
      case "image": 
      return (
        <ViroARScene onTrackingUpdated={this._onInitialized} >
          <ViroImage
            height={0.1}
            width={0.1}
            source={{uri: data.imageUri}}
          />
        </ViroARScene>
      );
      case "video":
        return (
          <ViroARScene>
            <ViroVideo
              source={{uri: data.videoUri}}
              scale={[.1, .1, 0]}
            />
          </ViroARScene>
        );
      case "text":
          return (
            <ViroARScene>
              <ViroText text={ data.text } scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
            </ViroARScene>
          );  
    }
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        isInitialised: true
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = ARScene;
