import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Loading from '../screens/LoadingScreen'
import HeaderNav from './HeaderNav'
import BottomTabNav from './BottomTabNav'

const RootNavigator = createStackNavigator({
  LoadingScreen: {
    screen: Loading,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  HeaderNav:{
    screen: HeaderNav,
  navigationOptions: ({ navigation }) => ({
    header: null
  })
},
  BottomTabNav:{
    screen: BottomTabNav,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
});
export default createAppContainer(RootNavigator);
