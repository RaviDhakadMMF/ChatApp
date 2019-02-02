/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, TextInput } from 'react-native';
import firebase from 'react-native-firebase';
// import GiftedChat from ''
export default class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refrence: '',
      email: '',
      password: '',
      animating: true
    }
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        animating: false
      })
    }, 1000)
  }

  componentDidMount(){
   
          firebase.messaging().hasPermission().then(enabled => {
            if (enabled) {
              firebase.messaging().getToken().then(fcmToken => {
                if (fcmToken) {
                  console.log('fcmToken   : - ',fcmToken)
                  AsyncStorage.setItem('fcmToken', fcmToken);  
                
                } else {
                  // user doesn't have a device token yet -- **my problem is here**
                } 
              });
            } else {
             // this.requestPermission();
              console.log('enabled 00  : - ',JSON.stringify(enabled))  
              // user doesn't have a device token yet -- **my problem is here**  
            } 
          });      
  }

  handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((responseJson) => {
        try {
          console.log('user data : - ',JSON.stringify(responseJson))     
          AsyncStorage.setItem('userid',responseJson.user.uid);
        // this.props.navigation.navigate('ChatScreen')
      }catch(err){  
        console.log('async error : - ',error.message);     
      }
      }).catch((error) => {
        console.error('Error message : - ', error);
      });
  }

  render() {
    return (
      <View style={styles.mainContainer}>


        <View style={{ position: 'absolute', zIndex: 1, top: "47.3%", left: "50%" }}>
          <ActivityIndicator
            animating={this.state.animating}
            color='#bc2b78'
            size="large"
          />
        </View>

        <View style={styles.container}>
          {/* <InputTextBorder placeHolder={"Mobile No."} />

          <InputTextBorder placeHolder={"Password"} /> */}

          <View style={styles.container1}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Phone Number"
              onChangeText={TextInputValue => this.setState({ email: TextInputValue })}
              underlineColorAndroid="transparent" />
          </View>

          <View style={styles.container1}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Password"
              onChangeText={TextInputValue => this.setState({ password: TextInputValue })}
              underlineColorAndroid="transparent" />
          </View>

          <TouchableHighlight onPress={this.handleLogin}>
            <View style={styles.signInButton}>
              <Text style={styles.signInText}>Sign in</Text>
            </View>
          </TouchableHighlight>

        </View>
      </View>

      // <View style={styles.container}>
      // <TouchableHighlight onPress={this.handleLogin}>
      //   <Text style={styles.welcome}>Welcome to React Native LoginPage!</Text>
      //   </TouchableHighlight>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f8f7',

  }, container1: {
    height: 50,
    width: "95%",
    marginTop: 40,
  },
  textInputStyle: {
    borderColor: '#e7e9ea',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    paddingLeft: 15
  },
  forgotPasswordText: {
    fontSize: 15,
    marginTop: 20,
    color: '#70767c'

  },
  signInButton: {
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 40,
    width: '100%',
    backgroundColor: '#e38298',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e38298'
  },
  signInText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold', paddingLeft: 20, paddingRight: 20
  }
});