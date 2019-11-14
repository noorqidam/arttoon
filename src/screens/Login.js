import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground } from 'react-native';
import { Item, Input, Button, Icon, Container } from 'native-base';
const Logo = require('./../images/logoPositiveToon.png');
const Backgound = require('./../images/background2.jpeg');

import { connect } from 'react-redux'
import * as actionUsers from './../redux/actions/actionUsers'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'admin@gmail.com',
      password: 'rahasia',
      icon: 'eye-off',
      passMode: true
    };
  }

  validate = (text) => {
    //console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (reg.test(text) === false) {
      alert("Email is Not Correct");
      this.setState({ email: text })
      return false;
    }
    else {
      this.setState({ email: text })
      this.handleLogin()


    }
  }

  modeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      passMode: !prevState.passMode
    }));
  }


  async handleLogin() {
    let data = { email: this.state.email, password: this.state.password }
    await this.props.handlePostUsers(data)
    const dataUser = this.props.usersLocal.users.data
    //alert(dataUser.user.id)
    if (dataUser.token) {
      await AsyncStorage.multiSet([
        ['token', dataUser.token],
        ['userId', `${dataUser.user.id}`],
        ['userName', dataUser.user.name]
      ])
      // await AsyncStorage.setItem('userId', this.props.usersLocal.users.data.user.id)
      this.props.navigation.navigate('BottomTabNav')
      //alert('here')
    } else {
      alert(this.props.usersLocal.users.data.message)
    }

  }

  demo() {
    this.setState({ password: 'rahasia' })
    this.setState({ email: 'admin@gmail.com' })
  }

  async passLogin() {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      this.props.navigation.navigate('BottomTabNav')
    }
  }

  // componentDidMount() {
  //   this.passLogin()
  // }



  render() {
    const { label, icon, onChange } = this.props;
    return (
      <Container style={styles.container}>
        <ImageBackground source={Backgound}
        style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
          <SafeAreaView>
            <View style={styles.form}>
              <View style={styles.marginTitle}>
                <Image
                  source={Logo}
                  style={{ height: 200, width: 200 }} />
                <Text style={styles.subTitle}>Login with your account</Text>
              </View>
              <View>
                <Text style={styles.text}>Email</Text>
                <Item regular
                  style={styles.formItem}>
                  <Input
                    value={this.state.email}

                    onChangeText={(text) => this.setState({ email: text })}
                    autoCapitalize='none'
                    keyboardType='email-address' />
                </Item >
                <Text style={styles.text}>Password</Text>
                <Item regular
                  style={styles.formItem}>
                  <Input
                    secureTextEntry={this.state.passMode}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    keyboardType='default' />
                  <Icon name={this.state.icon} onPress={() => this.modeIcon()} />
                </Item>
                <Button block rounded style={styles.Button}
                  onPress={() => this.validate(this.state.email)}>
                  <Text style={{ color: '#ffffff' }}>Login</Text></Button>
                <Item style={styles.Text}>
                  <Text style={styles.text}>don't have an account yet </Text>
                  <Text style={styles.TextMode}
                    onPress={() => this.props.navigation.navigate('Register')}> Register</Text>
                </Item>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: Dimensions.get('window').width,
    //backgroundColor: 'skyblue'
  },
  form: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 15,
    alignSelf: 'center'
  },
  marginTitle: {
    alignItems: 'center',
    padding: 10
  },
  marginSubTitle: {
    marginTop: 80,
    marginBottom: 60,
  },
  title: {
    fontSize: 50
  },
  text: {
    //color: 'white',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  subTitle: {
    fontSize: 20,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  box: {
    //borderColor: 'white',

  },
  formItem: {
    marginBottom: 10,
    backgroundColor: '#FAAE00',
    opacity: 0.9,
    borderWidth: 2,
    borderColor: 'black'
    //borderColor: 'white'
  },
  TextMode: {
    color: 'blue',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  Text: {
    marginTop: 20,
    alignSelf: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
    
  },
  Button: {
    backgroundColor: '#E4353A',
    borderWidth: .5,
    borderColor: 'black' 
  }
})



const mapStateToProps = state => {
  return {
    usersLocal: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handlePostUsers: (data) => dispatch(actionUsers.handlePostUsers(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
