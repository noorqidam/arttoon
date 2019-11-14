import React from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, FlatList, AsyncStorage, Platform, Image } from 'react-native';
import {
  Container, Content, Body, Item, Button, Input, Icon, Thumbnail, ListItem, Header,
  Left, Title, Right, Spinner
} from 'native-base'
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux'
import * as actionMyEpisodes from './../redux/actions/actionMyEpisodes'
import * as actionMyWebtoons from './../redux/actions/actionMyWebtoons'

const creatFormData = (photo, fieldname) => {
  const data = new FormData();
  data.append(fieldname, {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS == "android" ? photo.uri : photo.uri.replace("file://", "")
  })
  return data
}


class CreateWebtoon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      genre: '',
      id: this.props.navigation.state.params.webtoon.id,
      data: [],
      param: [],
      newData: [],
      filePath: {
        uri: this.props.navigation.state.params.webtoon.image,
      },
      isUpload: false,
      cover: null,
    };
  }

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
          isUpload: true
        });
      }
    });
  };

  async UploadPhotoMyWebtoons(fieldname) {
    console.log('here');

    const param = {
      token: await AsyncStorage.getItem('token'),
      data: await creatFormData(this.state.filePath, fieldname)
    }
    console.log('get token');

    await this.props.handleAddPhotoMyWebtoons(param)
    await this.setState({ cover: this.props.myWebtoons.imageUrl })
    console.log(this.props.myWebtoons.imageUrl);

  }
  async handleMyCreation() {
    if (this.state.isUpload) {
      await this.UploadPhotoMyWebtoons(`${this.state.id}`)
    }
    if (!this.props.myWebtoons.isImgError) {
      const params = {
        ...this.state.param,
        data: {
          title: this.state.title,
          genre: this.state.genre,
          image: this.state.cover
        }
      }
      await this.props.handleUpdateMyWebtoons(params)
      await this.props.navigation.navigate('MyCreation')
    }
  }
  async handleCreateEpisode() {
    const newData = { title: `ep ${this.state.data.length + 1}`, image: 'https://via.placeholder.com/1080' }
    await this.addData(newData)
    await this.userData()
    await this.props.navigation.navigate('CreateEpisode', {
      episode: this.state.newData,
      webtoon: this.state.id
    })
  }

  handleEditEpisode() {
    this.props.navigation.navigate('EditEpisode')
  }


  UNSAFE_componentWillMount() {
    this.userData()

  }

  async userData() {
    const param = {
      token: await AsyncStorage.getItem('token'),
      user: await AsyncStorage.getItem('userId'),
      webtoon: await this.state.id
    }
    await this.setState({ param: param })
    this.getData()
  }

  async getData() {
    await this.props.handleGetMyEpisodes(this.state.param)
    await this.setState({ data: this.props.myEpisodes.episodes.data })

  }


  async addData(newData) {

    const param = {
      ...this.state.param,
      data: newData
    }
    await this.props.handleAddMyEpisodes(param)
    await this.setState({ newData: this.props.myEpisodes.episodes.data })
    // await console.log(this.state.newData);
  }


  render() {
    if (this.props.myEpisodes.isLoading) {
      return (<Spinner />)
    }
    else if (this.props.myEpisodes.isSuccess) {
      // alert('here')
      if (this.props.myEpisodes.needRefresh) {
        this.getData()
      }
      return (
        <Container>
          <Header style={styles.Header}>
            <Left>
              <Button transparent
                onPress={() => this.props.navigation.goBack(null)} >
                <Icon name='arrow-back'
                />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>Create Webtoon</Title>
            </Body>
            <Right>
              <Button transparent
                onPress={() => this.handleMyCreation()}>
                <Icon name='checkmark' />
              </Button>
            </Right>

          </Header>
          <Content style={styles.container}>
            <View style={styles.formTitle}>
              <Button block style={{ width: '100%', height: 200, alignSelf: 'center' }}
                onPress={this.chooseFile.bind(this)}>
                <Image style={{ width: '100%', height: 200 }}
                  source={{ uri: this.state.filePath.uri }} />
              </Button>

              <Text style={styles.subTitle}>Title</Text>
              <Item regular style={styles.box}>
                <Input
                  value={this.state.title}
                  onChangeText={(text) => this.setState({ title: text })}
                />
              </Item>
              <Text style={styles.subTitle}>Genre</Text>
              <Item regular style={styles.box}>
                <Input
                  value={this.state.genre}
                  onChangeText={(text) => this.setState({ genre: text })}
                />
              </Item>
            </View>
            <View style={styles.formEp}>
              <Text style={styles.subTitle}>Episode</Text>
              <SafeAreaView style={styles.form}>
                <FlatList
                  data={this.state.data}
                  renderItem={({ item }) =>
                    <ListItem thumbnail>
                      <Button transparent onPress={() => this.handleEditEpisode()}>
                        <Thumbnail square source={{ uri: item.image }} /></Button>
                      <Body>
                        <Text>{item.title}</Text>
                        <Text note numberOfLines={1}>{item.updatedAt}</Text>
                      </Body>
                    </ListItem>
                  }
                  keyExtractor={item => item.ep}
                  inverted />

              </SafeAreaView>
            </View>
            <Button block style={styles.addButton}
              onPress={() => this.handleCreateEpisode()}>
              <Text style={{ color: '#ffffff' }} >+ Add Episode</Text>
            </Button>

          </Content>
        </Container>
      );
    }
    else { return (<Spinner />) }
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 10
  },
  formTitle: {
    marginVertical: 10
  },
  box: {
    borderWidth: .5,
    borderColor: 'black'
  },
  formEp: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  subTitle: {
    fontSize: 20,
  },
  text: {
    fontSize: 16,
  },
  Header: {
    backgroundColor: '#E3608A',
  },
  addButton: {
    margin: 5,
    backgroundColor: '#40bfc1',
    borderWidth: .5,
    borderColor: 'black'
  },
  deleteButton: {
    margin: 5,
    backgroundColor: '#E4353A',
    borderWidth: .5,
    borderColor: 'black'
  }
})


const mapStateToProps = state => {
  return {
    myEpisodes: state.myEpisodes,
    myWebtoons: state.myWebtoons
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetMyEpisodes: (param) => dispatch(actionMyEpisodes.handleGetMyEpisodes(param)),
    handleAddMyEpisodes: (param) => dispatch(actionMyEpisodes.handleAddMyEpisodes(param)),

    handleUpdateMyWebtoons: (param) => dispatch(actionMyWebtoons.handleUpdateMyWebtoons(param)),
    handleAddPhotoMyWebtoons: (param) => dispatch(actionMyWebtoons.handleAddPhotoMyWebtoons(param))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWebtoon);