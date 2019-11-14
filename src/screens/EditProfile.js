import { StyleSheet, Dimensions, View, } from 'react-native';
import React, { Component } from 'react';
import { Button, Thumbnail } from 'native-base';
import ImagePicker from 'react-native-image-picker';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: { uri: 'https://s.kaskus.id/images/2017/02/27/2153697_20170227015800.jpg' },
      name: 'Your name',

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
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.ProfileForm}>

        <Button transparent bordered rounded style={styles.ProfileImage}
          title='Choose File'
          onPress={this.chooseFile.bind(this)} >
          <Thumbnail style={styles.ProfileImage}
            source={{ uri: this.state.filePath.uri }} /></Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    padding: 4,
  },
  form: {
    padding: 5
  },
  title: {
    fontSize: 20,
  },
  ProfileImage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  ProfileForm: {
    marginTop: 50,
    alignItems: 'center'
  },
  textInput: {
    width: 200,
    height: 50,
  }
})