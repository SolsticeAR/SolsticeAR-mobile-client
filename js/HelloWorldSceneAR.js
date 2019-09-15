'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import { getActiveExperienceData } from '../globalExperience.js';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    let data = getActiveExperienceData();
    let type = data.type;

    switch(type) {
      case "image": 
      return (
        <ViroARScene onTrackingUpdated={this._onInitialized} >
          <ViroText text={"TODO: Image"} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        </ViroARScene>
      );
      case "video":
        return (
          <ViroARScene>
            <ViroText text={"TODO: Video"} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
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
        text : "Hello World!"
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

module.exports = HelloWorldSceneAR;
