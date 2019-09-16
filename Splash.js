import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

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
        <View style={{height: 50}}>
          <Text>Oi Oi this is a splash page, test me</Text>
        </View>
        <View>
          <TouchableHighlight onPress={() => { this.onCampaignPress() }} style={localStyles.buttons} underlayColor={'#68a0ff'}>
              <View>
                <Text style={localStyles.buttonText}>TEST ME</Text>
              </View>
            </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
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
  }
});
