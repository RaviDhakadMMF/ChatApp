import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View,Alert} from 'react-native';
import firebase from 'react-native-firebase';

import {createDrawerNavigator, createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import LoginPage from './src/LoginPage'
import ChatPage from './src/ChatPage'

const RootStack = createStackNavigator({
 
  LoginScreen: { screen: LoginPage },
  ChatScreen: { screen: ChatPage },  
 
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  });

export default class App extends Component {
  render() {
    console.log("Response fetch APP: - " + "dataSource");
    return (

      <RootStack />

    );
  }
}

// export default class App extends Component{

//   componentDidMount() {
//    this.checkPermission();
//     this.createNotificationListeners();
//   }
//   checkPermission() {
//     firebase.messaging().hasPermission().then(enabled => {
//       if (enabled) {
//         this.getToken();
//       } else {
//        // this.requestPermission();
//         console.log('enabled 00  : - ',JSON.stringify(enabled))  
//         // user doesn't have a device token yet -- **my problem is here**  
//       } 
//     });
   
 
//   }
   
//   getToken() {
//     //let fcmToken =  AsyncStorage.getItem('fcmToken', value);
//    // if (!fcmToken) {
//     firebase.messaging().getToken().then(fcmToken => {
//       if (fcmToken) {
//         console.log('fcmToken   : - ',JSON.stringify(fcmToken))    
//         AsyncStorage.setItem('fcmToken', fcmToken);  
//         // user has a device token
//       } else {
//         // user doesn't have a device token yet -- **my problem is here**
//       } 
//     });
//   }
//   requestPermission() {
//     try {
//          firebase.messaging().requestPermission();
//         // User has authorised
//         this.getToken();
//     } catch (error) {
//         // User has rejected permissions
//         console.log('permission rejected');
//     }
//   }
   
//   createNotificationListeners() {
//     /*
//     * Triggered when a particular notification has been received in foreground
//     * */
//     this.notificationListener = firebase.notifications().onNotification((notification) => {
//       console.log('notification   : - ',notification)
//     });
  
//     /*
//     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
//     * */
//     this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
//       console.log('BAckground : ',notificationOpen)
//     });
  
//     /*
//     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
//     * */   
//    firebase.notifications().getInitialNotification().then(notificationOpenNew => {
//       if (notificationOpenNew) {
//         console.log('notificationOpneClose : ',notificationOpenNew)
//       } else {
//         console.log('notificationOpneClose : ','notificationOpen')
//       } 
//     });
//     /*
//     * Triggered for data only payload in foreground
//     * */
//     this.messageListener = firebase.messaging().onMessage((message) => {
//       //process data message
//      // console.log(JSON.stringify(message));
//     });
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
       
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
