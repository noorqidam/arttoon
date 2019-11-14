import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Login from './../screens/Login'
import Register from './../screens/Register'
import Detail from './../screens/Detail'
import DetailEpisode from './../screens/DetailEpisode';
import MyCreation from './../screens/MyCreation';
import CreateWebtoon from './../screens/CreateWebtoon';
import CreateEpisode from './../screens/CreateEpisode';
import EditWebtoon from './../screens/EditWebtoon';
import EditEpisode from './../screens/EditEpisode';
import ForYou from './../screens/ForYou';
import Favorite from './../screens/MyFavorite';

//import ScreenTest from './../screens/ScreenTest';

// without Bottom Tab Navigator
const HeaderNav = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  ForYou: {
    screen: ForYou,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  Favorite: {
    screen: Favorite,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  Detail: {
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  DetailEpisode: {
    screen: DetailEpisode,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  MyCreation: {
    screen: MyCreation,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  CreateWebtoon: {
    screen: CreateWebtoon,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  CreateEpisode: {
    screen: CreateEpisode,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  EditWebtoon: {
    screen: EditWebtoon,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  EditEpisode: {
    screen: EditEpisode,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
});

export default createAppContainer(HeaderNav);