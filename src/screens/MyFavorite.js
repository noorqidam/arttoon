import React from 'react';
import { View, Text, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Container, Content, Body, Item, 
  Button, Input, Icon, List, Thumbnail, ListItem, Card, Header, Spinner } from 'native-base'


import { connect } from 'react-redux'
import * as actionFavorites from './../redux/actions/actionFavorites'


class MyFavorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //test : this.props.navigation.favorite,
      arrayholder: [],
      data: [],
      param:[],
    };
  }

  handleDetail() {
    this.props.navigation.navigate('Detail')
  }

  // UNSAFE_componentDidMount() {
  //   //const { favorite } = this.props.navigation.state.params;
  //   //this.setState({banners: favorite})
  //   this.setState({ arrayholder: this.state.banners })
  // }
  UNSAFE_componentWillMount() {
    this.getFavorite()
  }
  async getFavorite() {
    console.log('now');
    const param = {
      token: await AsyncStorage.getItem('token'),
      user: await AsyncStorage.getItem('userId')
    }
    await this.setState({param: param})
    console.log('here');
    
    await this.getData()
  }
  async getData() {
    await this.props.handleGetFavorites(this.state.param)
    await this.setState({ data: this.props.favoritesLocal.favorites.data })
  
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

  // searchFilterFunction = text => {
  //   const newData = this.state.arrayholder.filter((item) => {
  //     const itemData = item.title.toUpperCase();
  //     const textData = text.toUpperCase();

  //     return itemData.indexOf(textData) > -1;

  //   });

  //   this.setState({ banners: newData });
  // };

  render() {
    if (this.props.favoritesLocal.isLoading) {
      return (<Spinner />)
    }
    else if (this.props.favoritesLocal.isSuccess) {
      if (this.props.favoritesLocal.needRefresh) {
        this.getData()
      }
    }
    return (
      <Container style={styles.container}>
        <Header searchBar style={styles.Header}>
            <View style={styles.formSearch}>
              <Item regular>
                <Input
                  placeholder="Type Here..."
                  lightTheme
                  onChangeText={text => this.searchFilterFunction(text)}
                />
                <Icon name='search'
                  onPress={() => alert('search')} />
              </Item>
            </View>
          </Header>
        <Content>
          <View style={styles.formFav}>
            <Text style={styles.title}>Favorite</Text>
            <List dataArray={this.state.data}
              renderRow={(item) =>
                <Card style={styles.Card}>
                  <ListItem thumbnail>
                    <Button onPress={() => this.handleDetail()}>
                      <Thumbnail square source={{ uri: item.webtoon_id.image }} />
                    </Button>
                    <Body>
                      <Text>{item.webtoon_id.title}</Text>
                      <Text note numberOfLines={1}>{item.webtoon_id.favorite_count} Favorite</Text>
                    </Body>
                    <Icon name='star' style={{marginRight: 20,}}
                    onPress={() => this.deleteFavorite(item.webtoon_id.id) }/>
                  </ListItem>
                </Card>
              }>
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: '#f4f4f4'
  },
  Header: {
    backgroundColor: '#E3608A',
  },
  formSearch: {
    marginVertical: 10,
    width: Dimensions.get('window').width-20
  },
  formFav: {
    padding: 5
  },
  title: {
    padding: 5,
    fontSize: 20,
  },
  Card: {
    borderWidth: 5,
    borderColor: 'black'
  }
})


const mapStateToProps = state => {
  return {
    favoritesLocal: state.favorites
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetFavorites: (param) => dispatch(actionFavorites.handleGetFavorites(param)),
    handleDeleteFavorites: (param) => dispatch(actionFavorites.handleDeleteFavorites(param))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyFavorite);
