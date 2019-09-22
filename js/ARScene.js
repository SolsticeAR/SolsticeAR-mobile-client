'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import { getActiveExperienceData } from '../globalExperience.js';

import {
  ViroARScene,
  ViroImage,
  ViroAnimatedImage,
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
          <ViroText text={"Initialising..."} scale={[.5, .5, .5]} rotation={[0, 180, 0]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        </ViroARScene>
        );
      case "image": 
      return (
        <ViroARScene onTrackingUpdated={this._onInitialized} >
          <ViroImage
            position={[0, 0, -2]}
            scale={[1, 1, 0]}
            source={{uri: data.imageUri}}
          />
          <ViroImage
            position={[0, 0, -2]}
            rotation={[0, 180, 0]}
            scale={[1, 1, 0]}
            source={{uri: data.imageUri}}
          />
        </ViroARScene>
      );
      case "animatedImage":
        return (
          <ViroARScene onTrackingUpdated={this._onInitialized} >
          <ViroAnimatedImage
            position={[0, 0, -2]}
            scale={[1, 1, 0]}
            rotation={[0, 180, 0]}
            source={{uri: data.imageUri}}
          />
          <ViroAnimatedImage
            position={[0, 0, -2]}
            scale={[1, 1, 0]}
            source={{uri: data.imageUri}}
          />
        </ViroARScene>
        );
      case "video":
        return (
          <ViroARScene>
            <ViroVideo
              source={{uri: data.videoUri}}
              position={[0, 0, -2]}
              loop={true}
            />
            <ViroVideo
              source={{uri: data.videoUri}}
              position={[0, 0, -2]}
              rotation={[0, 180, 0]}
              loop={true}
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
    fontFamily: 'Catamaran',
    fontSize: 30,
    color: '#7b4397',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = ARScene;
