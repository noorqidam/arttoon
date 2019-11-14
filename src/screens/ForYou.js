import React from 'react';
import { View, Text, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import {
  Container, Content, Body, Item, Button, Input, Icon, List,
  Card, CardItem, Thumbnail, ListItem, Left, Header, Spinner
} from 'native-base'
import Slideshow from 'react-native-image-slider-show';

import { connect } from 'react-redux'
import * as actionWebtoons from './../redux/actions/actionWebtoons'
import * as actionFavorites from './../redux/actions/actionFavorites'


class ForYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      slidePos: 1,
      slideInterval: null,
      favorites: [],
      data: [],
      imageBanners: [],
      param: [],
    };
  }


  async UNSAFE_componentWillMount() {
    this.setState({
      slideInterval: setInterval(() => {
        this.setState({
          slidePos: this.state.slidePos === this.state.data.length ? 0 : this.state.slidePos + 1
        });
      }, 2000)
    });
    this.getData()
    this.getFavorite()
  }

  async getData() {
    await this.props.handleGetWebtoons()
    await this.setState({ data: this.props.webtoonsLocal.webtoons.data })

  }
  async getFavorite() {
    const param = {
      token: await AsyncStorage.getItem('token'),
      user: await AsyncStorage.getItem('userId')
    }
    console.log(param);
    await this.props.handleGetFavorites(param)
    await console.log('get favorites');
    await this.setState({ favorites: this.props.favoritesLocal.favorites.data })
    await this.setState({ param })
  }

  UNSAFE_componentDidMount() {
    // let image = []
    // for(let i=0; i < 2; i++){
    //   image[i]= this.state.data[i].image
    // }
    // this.setState({imageBanners: image})

    let newData = this.state.data;
    //newData[idx].isFav = !newData[idx].isFav;
    // function update favorite list
    newData = this.state.data.filter((item) =>
      item.isFav == true
    );
    this.setState({ favorite: newData });
    this.props.navigation.setParams({ favorite: this.state.favorite })

  }


  UNSAFE_componentWillUnmount() {
    clearInterval(this.state.slideInterval);
  }
  handleDetail(item) {
    this.props.navigation.navigate('Detail', { webtoon: item })
  }

  onHandleFavoriteBtn(idx) {
    let newData = this.state.data;
    newData[idx].isFav = !newData[idx].isFav;
    if (newData[idx].favBtnColor == '#ff9c9c') {
      newData[idx].favBtnColor = '#ff3333'
    } else if (newData[idx].favBtnColor == '#ff3333') {
      newData[idx].favBtnColor = '#ff9c9c'
    }
    // function update favorite list
    newData = this.state.data.filter((item) =>
      item.isFav == true
    );
    this.setState({ favorite: newData });
  }

  async addFavorite(id) {
    let param = {
      token: this.state.param.token,
      user: this.state.param.user,
      data: {
        id_webtoon: id
      }
    }
    console.log('add fav');
    await this.props.handleAddFavorites(param)
    console.log('done');
  }

  async deleteFavorite(id) {
    let param = {
      token: this.state.param.token,
      user: this.state.param.user,
      webtoon: id
    }
    console.log('delete fav');
    await this.props.handleDeleteFavorites(param)
    console.log('done delete');
  }
  buttonColorhandler(index) {
    let output = false
    if (this.state.favorites.length > 0) {
      //console.log('lengh',this.state.favorites.length);
      for (let i = 0; i < this.state.favorites.length; i++) {
        //console.log(i);
        if (this.state.data[index].id === this.state.favorites[i].id_webtoon) {
          // console.log(this.state.data[index].id, ' vs ', this.state.favorites[i].id_webtoon);
          output = true
        }
      }
      return output
    }
  }

  render() {
    if (this.props.webtoonsLocal.isLoading) {
      return (<Spinner />)
    }
    else if (this.props.webtoonsLocal.isSuccess || this.props.favoritesLocal.isSuccess) {
      // alert('here')
      if (this.props.webtoonsLocal.needRefresh) {
        this.getData()
      }
      if (this.props.favoritesLocal.needRefresh) {
        this.getFavorite()
      }
      return (
        <Container style={styles.container}>
          <Content>
            <Header searchBar style={styles.Header}>
              <Item regular>
                <Input
                  value={this.state.search}
                  onChangeText={(text) => this.setState({ search: text })}
                />
                <Icon name='search' />
              </Item>
            </Header>
            <Card
              style={styles.headerSlide}>
              <Slideshow height={200}
                dataSource={this.state.data}
                position={this.state.slidePos}
                onPositionChanged={position => this.setState({ position })}
              />
            </Card>

            <List>
              <Card bordered style={styles.formFav}>
                <ListItem itemDivider style={styles.ListDiv}>
                  <Text onPress={() => this.getFavorite()}
                    style={styles.title}>Favorite</Text>
                </ListItem>
                {
                  this.props.favoritesLocal.isLoading ? <Spinner /> :
                    <List dataArray={this.state.favorites} horizontal={true}
                      renderRow={(item) =>
                        <Card>
                          <CardItem thumbnail bordered style={{ alignContent: 'center' }}>
                            <Body>
                              <Button transparent onPress={() => alert('belum')}>
                                <Thumbnail square source={{ uri: item.webtoon_id.image }} />
                              </Button>
                              <Text>{item.webtoon_id.title}</Text>
                            </Body>
                          </CardItem>
                        </Card>
                      }>
                    </List>
                }
              </Card>

              <Card style={styles.formAll}>
                <ListItem itemDivider style={styles.ListDiv}>
                  <Text style={styles.title}>All</Text>
                </ListItem>
                <List
                  dataArray={this.props.webtoonsLocal.webtoons.data} horizontal={false}
                  renderRow={(item, i, index) =>
                    <CardItem thumbnail style={{ backgroundColor: 'transparent' }} >
                      <Left>
                        <Button transparent onPress={() => this.handleDetail(item)}>
                          <Thumbnail square source={{ uri: item.image }} />
                        </Button>
                        <Body>
                          <Text >{item.title}</Text>
                          <Button block small
                            style={{
                              backgroundColor: this.buttonColorhandler(index) ? 'grey' : '#F5E027',
                              width: 100,
                              borderWidth: .5,
                              borderColor: 'black'
                            }}
                            onPress={() => this.buttonColorhandler(index) ?
                              this.deleteFavorite(item.id) :
                              this.addFavorite(item.id)}>
                            <Text style={{ color: '#ffffff' }}>+ Favorite</Text>
                          </Button>
                        </Body>
                      </Left>
                    </CardItem>
                  }>
                </List>
              </Card>
            </List>

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
    backgroundColor: '#f5f5f5'//'#F5E027'
    //height: 500
  },
  Header: {
    backgroundColor: '#E3608A',
  },
  headerSlide: {
    width: Dimensions.get('window').width - 20,
    alignSelf: 'center',
    backgroundColor: '#E3608A',
    borderWidth: 10,
    borderColor: 'black'
  },
  formSearch: {
    marginVertical: 10
  },
  formFav: {
    alignSelf: 'center',
    backgroundColor: '#f5f5f5',
    width: Dimensions.get('window').width - 20,
    borderWidth: .2,
    borderColor: 'black'
  },
  formAll: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 20,
    backgroundColor: '#f4f4f4',
    borderWidth: .2,
    borderColor: 'black'
  },
  title: {
    height: 22,
    fontSize: 20,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  Slideshow: {
    width: Dimensions.get('window').width - 40,

  },
  favBtn: {
  },
  ListDiv: {
    backgroundColor: '#E3608A',
    borderWidth: .2,
    borderColor: 'black'

  }
})


const mapStateToProps = state => {
  return {
    webtoonsLocal: state.webtoons,
    favoritesLocal: state.favorites
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetWebtoons: () => dispatch(actionWebtoons.handleGetWebtoons()),
    handleGetFavorites: (param) => dispatch(actionFavorites.handleGetFavorites(param)),
    handleAddFavorites: (param) => dispatch(actionFavorites.handleAddFavorites(param)),
    handleDeleteFavorites: (param) => dispatch(actionFavorites.handleDeleteFavorites(param))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForYou);
