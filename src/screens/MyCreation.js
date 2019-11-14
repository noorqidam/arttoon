import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, AsyncStorage, TouchableHighlight } from 'react-native';
import {
  Container, Header, Left, Body,
  Button, Icon, Title, Thumbnail, List, ListItem, Fab, Card, Right, Spinner, CardItem
} from 'native-base';

import { connect } from 'react-redux'
import * as actionMyWebtoons from './../redux/actions/actionMyWebtoons'


class MyCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      param: [],
      data: [],

    };
  }

  async handleCreateWebtoon() {
    const params = {
      ...this.state.param,
      data: { title: `webtoon ${this.state.data.length + 1}`, image: 'https://via.placeholder.com/1080' }
    }
    await this.props.handleAddMyWebtoons(params)

    await this.props.navigation.navigate('CreateWebtoon', {
      webtoon: this.props.myWebtoons.webtoons.data.result,
    })
  }

  handleEditWebtoon(item) {
    console.log(item);
    
    this.props.navigation.navigate('EditWebtoon', { webtoon: item })
  }

  handleProfile() {
    this.props.navigation.navigate('Profile')
  }

  UNSAFE_componentWillMount() {
    this.userData()


  }

  async userData() {
    const param = {
      token: await AsyncStorage.getItem('token'),
      user: await AsyncStorage.getItem('userId')
    }

    await this.setState({ param: param })
    await this.getData()
  }
  async getData() {

    await this.props.handleGetMyWebtoons(this.state.param)
    await this.setState({ data: this.props.myWebtoons.webtoons.data })
  }
  render() {
    if (this.props.myWebtoons.isLoading) {
      return (<Spinner />)
    }
    else if (this.props.myWebtoons.isSuccess) {
      // alert('here')
      console.log('here');
      if (this.props.myWebtoons.needRefresh) {
        this.getData()
      }
      return (
        <Container>
          <Header style={styles.Header}>
            <Left>
              <Button transparent>
                <Icon name='arrow-back'
                  onPress={() => this.handleProfile()} />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>My Webtoon Creation</Title>
            </Body>
          </Header>
          <View style={styles.formAll}>
            <List
              dataArray={this.state.data}
              renderRow={(item) =>
                <Card style={styles.Card}>
                  <TouchableHighlight onPress={() => this.handleEditWebtoon(item)}>
                    <CardItem >
                      <Left>
                        <Button>
                          <Thumbnail square source={{ uri: item.image }} />
                        </Button>
                        <Body >
                          <Text>{item.title}</Text>
                          <Text note numberOfLines={1}>{item.genre}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                  </TouchableHighlight>
                </Card>
              }>
            </List>
            <Fab
              style={{ backgroundColor: '#40bfc1' }}
              position="bottomRight"
              onPress={() => this.handleCreateWebtoon()}>
              <Icon name="add" />
            </Fab>
          </View>
        </Container>
      );
    }
    else { return (<Spinner />) }
  }
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5'
  },
  formItem: {
    padding: 10
  },
  formAll: {
    marginTop: 10,
    flex: 1,
  },
  title: {
    padding: 5,
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  text: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  Header: {
    backgroundColor: '#E3608A',
  },
  Card: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 20,
    borderWidth: 10,
    borderColor: 'black'
  }
})

const mapStateToProps = state => {
  return {
    myWebtoons: state.myWebtoons
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetMyWebtoons: (param) => dispatch(actionMyWebtoons.handleGetMyWebtoons(param)),
    handleAddMyWebtoons: (param) => dispatch(actionMyWebtoons.handleAddMyWebtoons(param)),
    handleDeleteMyWebtoons: (param) => dispatch(actionMyWebtoons.handleDeleteMyWebtoons(param))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyCreation);
