import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Root } from 'native-base';

import configureStore from './src/store';
import AppNavigation from './src/AppNavigation';

const { store } = configureStore();

export default class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppNavigation />
        </Root>
      </Provider>
    );
  }
}
