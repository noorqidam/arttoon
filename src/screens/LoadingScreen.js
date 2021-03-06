import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image } from 'react-native';
const Backgound = require('./../images/loading.jpeg');

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

      timePassed: false
    };
  }

  async passLogin() {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      this.props.navigation.navigate('BottomTabNav')
    }
    else {
      this.props.navigation.navigate('Login')
    }
  }

  async UNSAFE_componentWillMount() {
    await this.passLogin()
  }

  render() {

    return (
      <Image
        source={require('../images/loadinglogo.png')}
        style={{ flex: 1 }} />

    );
  }
}
