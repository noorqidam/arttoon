import { StyleSheet, Dimensions, Text, Share, Image, View, FlatList, SafeAreaView } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, 
  Button, Icon, Title, Content, List, ListItem, Thumbnail } from 'native-base';
  
import {account} from './../data/dummy'

export default class ContainProfile extends Component {
  


  render() {
    return (      
      <View style= {styles.ProfileForm}>
        <Thumbnail style={styles.ProfileImage}
          source={{uri: this.props.accountImage}}/>         
       <Text style={styles.Text}>{this.props.accountName}</Text>
      </View>
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
  Text: {
    marginTop: 15,
    fontSize: 20,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  ProfileImage:{
    width: 150, 
    height: 150,
    borderRadius: 150/2
  },  
  ProfileForm: {
    marginVertical: 50,
    alignItems: 'center'
    
  },
})

