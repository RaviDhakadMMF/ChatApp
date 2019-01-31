/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import LoginPage from './src/LoginPage'
import ChatPage from './src/ChatPage'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
