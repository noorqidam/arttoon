import React from 'react';
import { createAppContainer } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'native-base'

import ForYou from './../screens/ForYou'
import Favorite from './../screens/MyFavorite'
import Profile from './RootProfile'


const BottomTabNav = createBottomTabNavigator(
  {
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
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'ForYou') {
          iconName = `apps`;
        } else if (routeName === 'Favorite') {
          iconName = `star-outline`;
        } else if (routeName === 'Profile') {
          iconName = `person`;
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={25} color='white' />;
      },
    }),
    tabBarOptions: {
      activeBackgroundColor: '#f6b95e',
      // inactiveBackgroundColor: '#4a3b3b',
      activeTintColor: 'black',
      inactiveTintColor: 'grey',
    },
  }
  // {
  //   Foryou: {
  //     screen: Foryou,
  //     navigationOptions: {
  //       tabBarLabel: 'For You',
  //       tabBarIcon: ({ tintColor }) => (
  //         <View>
  //           <Icon style={[{ color: tintColor }]} size={25} name={'apps'} />
  //         </View>
  //       ),
  //     },
  //   },
  //   Favorite: {
  //     screen: Favorite,
  //     navigationOptions: {
  //       tabBarLabel: 'Favourite',
  //       tabBarIcon: ({ tintColor }) => (
  //         <View>
  //           <Icon style={[{ color: tintColor }]} size={25} name={'star'} />
  //         </View>
  //       ),
  //       activeColor: 'orange',
  //       inactiveColor: '#ccc',
  //       barStyle: { backgroundColor: '#ffffff' },
  //     },
  //   },
  //   Profile: {
  //     screen: Profile,
  //     navigationOptions: {
  //       tabBarLabel: 'Profile',
  //       tabBarIcon: ({ tintColor }) => (
  //         <View>
  //           <Icon style={[{ color: tintColor }]} size={25} name={'person'} />
  //         </View>
  //       ),
  //       activeColor: 'orange',
  //       inactiveColor: '#ccc',
  //       barStyle: { backgroundColor: '#ffffff' },
  //     },
  //   },
  // },
  // {
  //   initialRouteName: 'Foryou',
  //   activeColor: 'orange',
  //   inactiveColor: '#ccc',
  // }
);
export default createAppContainer(BottomTabNav);
