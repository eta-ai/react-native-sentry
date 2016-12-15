/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import { 
  SentryClient, 
  SentrySeverity, 
  SentryLog 
} from 'sentry-react-native';

SentryClient.setLogLevel(SentryLog.Debug);
SentryClient.shared = new SentryClient("http://bf9398c8660c42ad89fdeac75c11a266:8eeb1d825c3942b384456c4356477ada@dgriesser-7b0957b1732f38a5e205.eu.ngrok.io/1");

SentryClient.shared.setExtras({
  "a_thing": 3,
  "some_things": {"green": "red"},
  "foobar": ["a", "b", "c"],
  "react": true,
  "float": 2.43
});

SentryClient.shared.setTags({
  "environment": "production",
  "react": true
});

export default class ReactNativeExample extends Component {
  _sendMessage() {
    SentryClient.shared.captureMessage("TEST message", SentrySeverity.Warning);
  }
  _throwError() {
    throw new Error('SentryClient: Test throw error');
  }
  _nativeCrash() {
    SentryClient.shared.nativeCrash();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Sentry example
        </Text>
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._throwError()}
          title="throw error!" />
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._nativeCrash()}
          title="native crash!" />
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._sendMessage()}
          title="send message" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactNativeExample', () => ReactNativeExample);