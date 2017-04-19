import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import registerForPushNotificationsAsync
  from '../api/registerForPushNotificationsAsync'
import { Notifications } from 'expo'
import Alerts from '../constants/Alerts'
import Button from '../components/Button'

export default class MyComponent extends Component {
  componentDidMount () {
    this._notificationSubscription = this._registerForPushNotifications()
  }

  componentWillUnmount () {
    this._notificationSubscription && this._notificationSubscription.remove()
  }

  render () {
    return (
      <View style={styles.container}>
        <Button title='Send Notification' onPress={this._sendNotification} />
      </View>
    )
  }

  _registerForPushNotifications () {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync()

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    )
  }

  _handleNotification = ({ origin, data }) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    )
  }

  _sendNotification = () => {
    const localNotification = {
      title: 'TEST',
      body: 'Testing',
      data: {
        data: 'This is the data.'
      },
      ios: {
        sound: true
      },
      android: {
        sound: true
      }
    }

    const schedulingOptions = {
      time: (new Date()).getTime() + 5000
    }
    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})
