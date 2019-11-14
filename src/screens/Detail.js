import { StyleSheet, Dimensions, Text, Share, Image, FlatList, SafeAreaView } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, ListItem, Thumbnail } from 'native-base';

import { connect } from 'react-redux'
//import * as actionTodos from './../redux/actions/actionTodos'
import * as actionEpisodes from './../redux/actions/actionEpisodes'


class Detail extends Component {


  constructor(props) {
    super(props);
    this.state = {
      cover: {
        title: this.props.navigation.state.params.webtoon.title,
        image: this.props.navigation.state.params.webtoon.image,
      },
      data: [],
    }
  }

  componentDidMount() {
    const webtoonId = this.props.navigation.state.params.webtoon.id
    this.props.handleGetEpisodes(webtoonId)

    if (this.props.episodesLocal.episodes.isSuccess) {
      this.setState({ data: this.props.episodesLocal.episodes.data })
    }
  }
  onClick() {
    Share.share({
      message: 'BAM: we\'re helping your business with awesome React Native apps',
      url: 'http://bam.tech',
      title: 'Wow, did you see that?'
    }, {
      // Android only:
      dialogTitle: 'Share BAM goodness',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  }

  handleDetailEp(item) {
    const webtoonId = this.props.navigation.state.params.webtoon.id
    this.props.navigation.navigate('DetailEpisode', { episode: item, webtoon: webtoonId })
  }

  handleBack() {
    this.props.navigation.navigate('BottomTabNav')
  }
  render() {
    return (
      <Container style={styles.Container}>
        <Header style={styles.Header}>
          <Left>
            <Button transparent>
              <Icon name='arrow-back'
                onPress={() => this.handleBack()} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>{this.state.cover.title}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='share-alt'
                onPress={() => this.onClick()} />
            </Button>
          </Right>
        </Header>
        <Content style={styles.container}>
          <Image
            style={{ width: 400, height: 150 }}
            source={{ uri: this.state.cover.image }} />
          <SafeAreaView style={styles.form}>
            <FlatList
              data={this.props.episodesLocal.episodes.data}
              renderItem={({ item }) =>
                <ListItem thumbnail onPress={() => this.handleDetailEp(item)}>
                  <Button transparent >
                    <Thumbnail square source={{ uri: item.image }} /></Button>
                  <Body>
                    <Text>{item.title}</Text>
                    <Text note numberOfLines={1}>{item.date}</Text>
                  </Body>
                </ListItem>
              }
              keyExtractor={item => item.id}
              inverted />
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
  formAll: {
    marginTop: 10,
    width: 250,

  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  Slideshow: {
    width: 250,
  },
  Header: {
    backgroundColor: '#E3608A',
  },
})


const mapStateToProps = state => {
  return {
    episodesLocal: state.episodes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetEpisodes: (webtoonId) => dispatch(actionEpisodes.handleGetEpisodes(webtoonId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
