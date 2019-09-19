import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight, Image} from 'react-native';
import OptionsMenu from 'react-native-options-menu';
import DialogInput from 'react-native-dialog-input';

export default class CornerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { isSearchByIdVisible: false };
  }

  searchForCampaign(rawInput) {
    let campaignId = parseInt(rawInput) || 0;
    this.props.onCampaignPress(campaignId);
  }

  render() {
    return (
      <View style={{position: 'absolute', right: 10, top: 10}}>
        <OptionsMenu 
            style={{margin:10}}
            button={require('./icons/hamburger_menu.png')}
            buttonStyle={{width: 30, height: 30, resizeMode: 'contain'}}
            options={["Show All", "Show Top 10", "Show Newest", "Search by ID#"]}
            actions={[
              () => { this.props.setSortMode('all') },
              () => { this.props.setSortMode('top10') },
              () => { this.props.setSortMode('new') },
              () => { this.setState({ isSearchByIdVisible: true })},
            ]}/>
        <DialogInput 
            isDialogVisible={this.state.isSearchByIdVisible}
            title={"Lookup Campaign"}
            message={"Search for Campaign by ID#:"}
            hintInput={"ID#"}
            submitInput={(inputText) => {this.searchForCampaign(inputText)} }
            closeDialog={() => {this.setState({ isSearchByIdVisible: false })}}>
        </DialogInput>
      </View>);
  }
}