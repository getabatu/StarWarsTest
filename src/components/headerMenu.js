import React, { Component } from 'react';
import { View, StatusBar, Dimensions, Image, TouchableOpacity, Platform, SafeAreaView } from 'react-native';

import GlobalStyle from '../style/globalStyle';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class HeaderGoBack extends Component {

    render() {
        let { pagetitle, onBack } = this.props
        return (
            <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }} >
                {this.props.children}
                <SafeAreaView style={{ flex: 0 }} />
            </SafeAreaView>
        );
    }
}