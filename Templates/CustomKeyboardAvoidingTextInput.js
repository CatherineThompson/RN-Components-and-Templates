import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Animated,
  Easing
} from 'react-native'
import { sendMessage } from '../api/contacts'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '../constants/Colors'

// This component is a messaging text input bar at the bottom of a screen.
// They keyboard avoiding part can be applied to other views.
export default class CustomKeyboardAvoidingTextInput extends Component {
  state = {
    message: '',
    anim: new Animated.Value(0)
  }

  // can change the listener settings for different events such as 'keyboardDidShow'
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }


  _keyboardDidShow = (e) => {
    Animated.timing(this.state.anim, {
      toValue: e.endCoordinates.height,
      easing: Easing.bezier(0.17, 0.59, 0.4, 0.77),
      duration: e.duration
    }).start()
  }

  _keyboardDidHide = (e) => {
    Animated.timing(this.state.anim, {
      toValue: 0,
      easing: Easing.bezier(0.17, 0.59, 0.4, 0.77),
      duration: e.duration
    }).start()
  }

  render () {
    const { contact } = this.props
    return (
      <View style={styles.container}>

        <Animated.View style={[styles.messageContainer, {bottom: this.state.anim}]}>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder='send message'
              onChangeText={this._handleTextChange}
              style={styles.textInput} />
          </View>
          <TouchableOpacity
            style={styles.sendButtonContainer}
            onPress={this._handleSendMessage}>
            <FontAwesome
              name='send'
              size={24}
              style={{color: Colors.tintColor}}/>
          </TouchableOpacity>
        </Animated.View>

      </View>
    )
  }

  _handleTextChange = (message) => {
    this.setState({ message: message })
  }

  _handleSendMessage = async () => {
    // Api call to send message
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    position: 'absolute',
    backgroundColor: 'white'
  },
  textInputContainer: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    flex: 1
  },
  textInput: {
    fontWeight: '300',
    backgroundColor: 'transparent',
    fontSize: 18,
    height: 30,
  },
  sendButtonContainer: {
    paddingLeft: 16
  }
})
