import React from 'React'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const RadioButton = ({title, selected, onPress}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
      {
         Platform.OS === 'ios' ? showIosRadioButtons(selected) : showAndroidRadioButtons(selected)
      }
      </View>
    </TouchableOpacity>
    <Text>{title}</Text>
  </View>
)

const showIosRadioButtons = (selected) => (
  selected
  ? <Ionicons name="ios-radio-button-on" size={40} color='gray'/>
  : <Ionicons name="ios-radio-button-off" size={40} color='gray'/>
)

const showAndroidRadioButtons = (selected) => (
  selected
  ? <MaterialIcons name="radio-button-checked" size={40} color='gray'/>
  : <MaterialIcons name="radio-button-unchecked" size={40} color='gray'/>
)

export default RadioButton

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4
  },
  buttonContainer: {
    marginRight: 10
  }
})
