import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Modal, Image } from 'react-native';

export default class Splash extends Component {
  
  constructor(props) {
    super(props);
  }
  
  onCampaignPress(id) {
    this.props.onChooseCampaignList();
  }

  render() {
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={true}
          style={localStyles.splashContainer}
        >
          <View style={localStyles.splashContainer}>
            <View style={localStyles.splashTitleContainer}>
              <Text style={localStyles.splashTitle}>Solstice AR</Text>
            </View>
            <View style={localStyles.splashDescriptionContainer}>
              <Text style={localStyles.splashDescription } allowFontScaling={true}>
                Welcome to Solstice AR. A platform that allows users to both create and enjoy unique augmented reality experiences.
              </Text>
            </View>
            <View style={localStyles.splashExitContainer}>
              <TouchableHighlight onPress={() => { this.onCampaignPress() }} style={localStyles.buttons} underlayColor={'#68a0ff'}>
                <View>
                  <Text style={localStyles.buttonText}>TRY IT</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  buttons: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: '#1e1a75',
    borderWidth: 1,
    marginTop: 5,
    marginRight: 5,
    width: 150,
  },
  buttonText: {
    color: '#1e1a75',
    alignSelf: 'center',
  },
  logo:{
    width: 100,
    height: 100,
		alignItems:'center',
  },
  splashContainer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: '#7b4397',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 70,
    marginBottom: 40,
    backgroundColor: 'white',
  },
	splashTitle:{
		color:'#1e1a75',
    fontWeight:'bold',
		fontSize:20,
		textAlign:'center',
		margin:10,	
	},
	splashDescription:{
		color:'#343a40',
    fontSize:15,
		marginRight:20,
		marginLeft:20
	},
	splashCloseIcon:{
		alignSelf:'flex-end',
		flex:0.5,
		marginRight:10
	},
	splashTitleContainer:{
		flex:1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
	},
	splashDescriptionContainer:{
		flex:6.5
	},
	splashExitContainer:{
		flex:2,
		justifyContent:'flex-start',
		alignItems:'center',
	}
});
