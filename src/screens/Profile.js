import { StyleSheet, Dimensions, Text, Share, Image, View, FlatList, SafeAreaView } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem, Thumbnail } from 'native-base';

export default class Profile extends Component {

  // handleBack() {
  //     this.props.navigation.navigate('BottomTabNav')
  //   }
  constructor(props) {
    super(props);
    this.state = {
      account: {
        name: 'Your name',
        image: 'https://s.kaskus.id/images/2017/02/27/2153697_20170227015800.jpg'
      },
    }
  }

  render() {
    return (
      <Container style={styles.Container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back'
                onPress={() => alert('back')} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Profile</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='create'
                onPress={() => alert('Edit')} />
            </Button>
          </Right>
        </Header>

        <Content style={styles.container}>
          <View style={styles.ProfileForm}>
            <Thumbnail style={styles.ProfileImage}
              source={{ uri: this.state.account.image }} />
            <Text style={styles.title}>{this.state.account.name}</Text>
          </View>

          <SafeAreaView style={styles.form}>
            <List>
              <ListItem selected>
                <Left>
                  <Text style={styles.allText}>My Webtoon Creation</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem selected>
                <Left>
                  <Text style={styles.allText}>Log Out</Text>
                </Left>
              </ListItem>

            </List>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    padding: 4
  },
  form: {
    padding: 5
  },
  title: {
    fontSize: 20,
  },
  allText: {
    fontSize: 15,
  },
  ProfileImage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2
  },
  ProfileForm: {
    marginVertical: 50,
    alignItems: 'center'

  },
})