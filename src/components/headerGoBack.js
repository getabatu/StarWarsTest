import React, { Component } from 'react';
import { View, Dimensions, Platform, Image, TouchableOpacity, StatusBar, SafeAreaView, Text } from 'react-native';
import { Icon } from "native-base";
import GlobalStyle from '../style/globalStyle';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class HeaderGoBack extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      cartQty: 0
    };
  }

  closeSearch() {
    this.setState({ isSearch: false })
    this.props.closeSearch();
  }

  render() {
    let { pagetitle, onBack } = this.props
    return (
      <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }} >
        <View style={{
          flexDirection: 'row',
          height: 60,
          backgroundColor: 'black',
          justifyContent: 'space-between',
        }}>
          <StatusBar
            backgroundColor={'black'}
            barStyle="light-content" />
          <View style={{
            flexDirection: 'row',
            height: 60,
            alignItems: 'center',
          }}>
            <TouchableOpacity onPress={onBack}>
              <View style={{
                flexDirection: 'row',
                height: 60, width: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon type={'FontAwesome'} name='arrow-left' style={{
                  color: 'white',
                  fontSize: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }} />
              </View>
            </TouchableOpacity>
            <View style={{ width: width * 0.90, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }} >
              <Text style={{
                fontSize: 17,
                letterSpacing: 0.5,
                color: 'white',
              }}>{pagetitle}</Text>
            </View>
          </View>
        </View>
        {this.props.children}
        <SafeAreaView style={{ flex: 0 }} />
      </SafeAreaView>
    );
  }
}