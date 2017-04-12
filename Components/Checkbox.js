import React from 'React'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const Checkbox = ({title, selected, onPress}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.checkboxContainer}>
      {
         Platform.OS === 'ios' ? showIosCheckboxes(selected) : showAndroidCheckboxes(selected)
      }
      </View>
    </TouchableOpacity>
    <Text>{title}</Text>
  </View>
)

const showIosCheckboxes = (selected) => (
  selected
  ? <Ionicons name="ios-checkbox-outline" size={40} color='gray'/>
  : <Ionicons name="ios-square-outline" size={40} color='gray'/>
)

const showAndroidCheckboxes = (selected) => (
  selected
  ? <MaterialIcons name="check-box" size={40} color='gray'/>
  : <MaterialIcons name="check-box-outline-blank" size={40} color='gray'/>
)

export default Checkbox

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4
  },
  checkboxContainer: {
    marginRight: 10
  }
})
