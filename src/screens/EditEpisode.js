import React from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, FlatList, AsyncStorage } from 'react-native';
import {
  Container, Content, Body, Item, Button, Input, Icon, Thumbnail, ListItem, Header,
  Left, Title, Right, Spinner
} from 'native-base';
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux'
import * as actionMyImages from './../redux/actions/actionMyImages'
import * as actionMyEpisodes from './../redux/actions/actionMyEpisodes'


class EditEpisode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: this.props.navigation.state.params.episode,
      webtoon: this.props.navigation.state.params.webtoon,
      filePath: [],
      data: [],
      param: []
    };
  }


  async handleCreateWebtoon() {
    const params = {
      ...this.state.param,
      data: this.state.episode
    }
    await this.props.handleUpdateMyEpisodes(params)

    await this.props.navigation.goBack(null)
  }
  handleCreateEpisode() {
    this.props.navigation.navigate('CreateEpisode')
  }

  handleAddBtn() {
    const addImg = this.state.filePath.uri
    const inText = { id: this.state.data.length + 1, fileName: 'a', url: addImg };
    const newData = this.state.data.slice();
    newData.push(inText);
    this.setState({ data: newData })
  }

  async handleRemoveBtn(idx) {
    // const deleteId = id
    // const newData = this.state.data.slice();
    // newData.push(delateId);
    // this.setState({ data: newData })
    const param = {
      ...this.state.param,
      image: idx
    }
    await this.props.handleDeleteMyImages(param)
    // this.userData()
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

        });
        const addImg = this.state.filePath.uri
        const fileName = this.state.filePath.fileName
        const addData = { page: this.state.data.length + 1, fileName, image: addImg };
        const newData = this.state.data.slice();
        newData.push(addData);
        this.setState({ data: newData })
        this.addData(addData)

      }
    });
  };

  UNSAFE_componentWillMount() {
    this.userData()
  }
  async addData(newData) {
    const param = {
      ...this.state.param,
      data: {
        page: newData.page,
        image: newData.image
      }
    }
    console.log('=====add====');

    console.log(param);

    await this.props.handleAddMyImages(param)
  }

  async userData() {
    const param = {
      token: await AsyncStorage.getItem('token'),
      user: await AsyncStorage.getItem('userId'),
      webtoon: await this.state.webtoon,
      episode: await this.state.episode.id
    }

    await this.setState({ param: param })
    await this.getData()

    console.log('=====get====');

    console.log(param);
  }

  async getData() {
    await this.props.handleGetMyImages(this.state.param)
    await this.setState({ data: this.props.myImages.images.data })
  }

  async handleDeleteEpisode() {
    const param = {
      ...this.state.param
    }
    await this.props.handleDeleteMyEpisodes(param)
    await this.props.navigation.goBack(null)
    //await this.props.handleGetMyEpisodes(this.state.param)

  }


  render() {
    if (this.props.myImages.isLoading) {
      return (<Spinner />)
    }
    else if (this.props.myImages.isSuccess) {
      // alert('here')
      if (this.props.myImages.needRefresh) {
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
              <Title style={styles.title}>Edit Episode</Title>
            </Body>
            <Right>
              <Button transparent
                onPress={() => this.handleCreateWebtoon()}>
                <Icon name='checkmark' />
              </Button>
            </Right>

          </Header>
          <Content style={styles.container}>
            <View style={styles.formTitle}>

              <Text style={styles.subTitle}>Name</Text>
              <Item regular style={styles.box}>
                <Input
                  value={this.state.episode.title}
                  onChangeText={(text) => this.setState({
                    episode: {
                      title: text
                    }
                  })}
                />
              </Item>
            </View>
            <View style={styles.formEp}>
              <Text style={styles.subTitle}>Add Images</Text>
              <SafeAreaView style={styles.form}>
                <FlatList
                  data={this.state.data}
                  renderItem={({ item }) =>
                    <ListItem thumbnail>
                      <Button transparent >
                        <Thumbnail square source={{ uri: item.image }} /></Button>
                      <Body>
                        <Text>{item.page}</Text>
                        <Button small block danger
                          style={styles.deleteImageButton}
                          onPress={() => this.handleRemoveBtn(item.id)}>
                          <Text style={styles.ButtonText}> delete </Text></Button>
                      </Body>
                    </ListItem>
                  }
                  keyExtractor={item => item.page}
                />

              </SafeAreaView>
            </View>
            <Button block square style={styles.addButton}
              title='Choose File'
              onPress={this.chooseFile.bind(this)}>
              <Text style={{ color: '#ffffff' }} >+ Image</Text>
            </Button>
            <Button block square danger
              style={styles.deleteButton}
              onPress={() => this.handleDeleteEpisode()}>
              <Text style={{ color: '#ffffff' }} >Delete Episode</Text>
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
  formEp: {
    padding: 5,
  },
  ButtonText: {
    color: '#ffffff'
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
  box: {
    borderWidth: .5,
    borderColor: 'black'
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
  },
  deleteImageButton: {
    width: 80,
    backgroundColor: '#E4353A',
    borderWidth: .5,
    borderColor: 'black'
  }
})



const mapStateToProps = state => {
  return {
    myImages: state.myImages,
    myEpisodes: state.myEpisodes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetMyImages: (param) => dispatch(actionMyImages.handleGetMyImages(param)),
    handleAddMyImages: (param) => dispatch(actionMyImages.handleAddMyImages(param)),
    handleDeleteMyImages: (param) => dispatch(actionMyImages.handleDeleteMyImages(param)),

    handleGetMyEpisodes: (param) => dispatch(actionMyEpisodes.handleGetMyEpisodes(param)),
    handleDeleteMyEpisodes: (param) => dispatch(actionMyEpisodes.handleDeleteMyEpisodes(param)),
    handleUpdateMyEpisodes: (param) => dispatch(actionMyEpisodes.handleUpdateMyEpisodes(param))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEpisode);
