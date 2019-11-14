import { StyleSheet, Dimensions  } from 'react-native';

export const account={
        name: 'Your name',
        image: 'https://s.kaskus.id/images/2017/02/27/2153697_20170227015800.jpg'
        
}

export const styles = StyleSheet.create({
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
  allText: {
    fontSize: 15,
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

