import { StyleSheet, Dimensions, Text, Share, Image, View,  } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, 
    Button, Icon, Input, Title, Content, Card, Thumbnail, Textarea } from 'native-base';


export default class HeaderProfile extends Component {

  render() {
    return (
        <Header>
        <Left>
          <Button  transparent>
            <Icon name='arrow-back'
             onPress={()=> alert('back')} />
          </Button>
        </Left>
        <Body>
          <Title style={styles.title}>{this.props.name}</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name={this.props.icon}
            onPress={()=> alert('Edit')}/>
          </Button>
        </Right>
        </Header>        
    );
  }
}
