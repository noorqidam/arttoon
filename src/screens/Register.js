import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image } from 'react-native';
import { Item, Input, Button, Icon, Container, Card } from 'native-base';

import { connect } from 'react-redux'
import * as actionUsers from './../redux/actions/actionUsers'


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
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
    const data = { email: this.state.email, password: this.state.password, name: this.state.name }
    await this.props.handleRegister(data)
    const dataUser = this.props.usersLocal.users.data.data
    //alert(dataUser.user.id)
    if (dataUser.token) {
      await AsyncStorage.multiSet([
        ['token', dataUser.token],
        ['userId', `${dataUser.id}`],
        ['userName', dataUser.name]
      ])
      // await AsyncStorage.setItem('userId', this.props.usersLocal.users.data.user.id)
      await this.props.navigation.navigate('BottomTabNav')

    } else {
      alert(this.props.usersLocal.users.data.message)
    }

  }

  render() {
    const { label, icon, onChange } = this.props;
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <View >
            <View style={[styles.marginTitle]}>
              <Image
                source={require('../images/logo.png')}
                style={styles.logo} />
              <Text style={styles.title}>Sign Up</Text>
            </View>
            <Card style={styles.card}>
              <View style={styles.contentCard}>
                <Text>Email</Text>
                <Item regular
                  style={styles.formItem}>
                  <Input
                    style={styles.formInput}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    autoCapitalize='none'
                    placeholder='input your email'
                    keyboardType='email-address' />
                </Item >
                <Text>Name</Text>
                <Item regular
                  style={styles.formItem}>
                  <Input
                    value={this.state.name}
                    placeholder='input your name'
                    onChangeText={(text) => this.setState({ name: text })}
                  />
                </Item>
                <Text>Password</Text>
                <Item regular
                  style={styles.formItem}>
                  <Input
                    secureTextEntry={this.state.passMode}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    placeholder='input your password'
                    keyboardType='default' />
                  <Icon name={this.state.icon} onPress={() => this.modeIcon()}
                  />
                </Item>
                <Button block
                  style={styles.btnRegister}
                  onPress={() => this.validate(this.state.email)}>
                  <Text style={{ color: '#ffffff' }}>Register</Text>
                </Button>
                <View style={styles.link}>
                  <Text style={styles.text}>Have an account already </Text>
                  <Text style={styles.TextMode}
                    onPress={() => this.props.navigation.navigate('Login')}>Login</Text>
                </View>
              </View>
            </Card>
          </View>
        </SafeAreaView>
      </Container>
    );
  }
}


const mapStateToProps = state => {
  return {
    usersLocal: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleRegister: (data) => dispatch(actionUsers.handleRegister(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    backgroundColor: '#4a3b3b'
  },
  marginTitle: {
    alignItems: 'center',
    padding: 10
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logo: {
    height: 300,
    width: 400
  },
  card: {
    borderRadius: 20,
    width: '90%',
    height: '50%',
    marginLeft: 20,
  },
  contentCard: {
    width: '90%',
    marginHorizontal: 20,
    padding: 10
  },
  formItem: {
    marginBottom: 10,
    borderColor: 'black'
  },
  btnRegister: {
    backgroundColor: '#00918e',
    borderRadius: 8,
    marginVertical: 5
  },
  TextMode: {
    color: 'blue',
  },
  link: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  }
})

