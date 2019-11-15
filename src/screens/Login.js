import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground } from 'react-native';
import { Item, Input, Button, Icon, Container, Card } from 'native-base';

import { connect } from 'react-redux'
import * as actionUsers from './../redux/actions/actionUsers'
import Icon1 from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/AntDesign';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'noorqidam@gmail.com',
      password: '1234',
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
        <SafeAreaView>
          <View>

            <Image
              source={require('../images/logo.png')}
              style={styles.logo} />
            <Text style={styles.subTitle}>Login with your account</Text>

            <Card style={styles.card}>
              <View style={styles.contentCard}>
                <Text style={styles.text}>Email</Text>
                <Item regular
                  style={styles.formItem}>
                  <Icon1 name='mail' style={styles.iconInput} />
                  <Input
                    style={styles.formInput}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    autoCapitalize='none'
                    keyboardType='email-address' />
                </Item >
                <Text style={styles.text}>Password</Text>
                <Item regular
                  style={styles.formItem}>
                  <Icon2 name='lock1' style={styles.iconInput} />
                  <Input
                    style={styles.formInput}
                    secureTextEntry={this.state.passMode}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    keyboardType='default' />
                  <Icon name={this.state.icon} onPress={() => this.modeIcon()} />
                </Item>
                <Button block
                  style={styles.btnLogin}
                  onPress={() => this.validate(this.state.email)}>
                  <Text style={styles.txtLogin}>Log In</Text>
                </Button>
                <View style={styles.link}>
                  <Text style={styles.text}>Don't have an account yet </Text>
                  <Text style={styles.TextMode}
                    onPress={() => this.props.navigation.navigate('Register')}>Sign Up</Text>
                </View>
              </View>
            </Card>
          </View>
        </SafeAreaView>
      </Container>
    );
  }
}

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
  logo: {
    height: 300,
    width: 400
  },
  title: {
    fontSize: 50
  },
  subTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#ffffff',
    alignSelf: 'center'
  },
  text: {
    color: 'black',
  },
  card: {
    borderRadius: 20,
    width: '90%',
    height: '42%',
    marginLeft: 20,
    marginTop: 50
  },
  contentCard: {
    width: '90%',
    marginHorizontal: 20,
    padding: 10
  },
  iconInput: {
    fontSize: 20,
    marginLeft: 10,
  },
  formItem: {
    marginBottom: 10,
    borderColor: 'black'
  },
  formInput: {
    width: 90,
  },
  btnLogin: {
    backgroundColor: '#00918e',
    borderRadius: 8,
    marginVertical: 5
  },
  txtLogin: {
    color: '#ffffff',
    fontWeight: 'bold'
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
