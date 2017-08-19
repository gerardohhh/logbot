// import React
import React, { Component } from 'react'

// import React Native components
import { AppRegistry, View, TouchableOpacity, TouchableHighlight, Text, StyleSheet } from 'react-native'

// import tab icons
import { MaterialIcons } from '@exponent/vector-icons'
import { Ionicons } from '@exponent/vector-icons'

// import default layout
import Layout from '../constants/Layout'

// export List class
export default class List extends Component {

  renderItem = (text, i) => {
    const {onPressItem} = this.props
    const {onPressCross} = this.props

    // return item list components
    return (
      <View key={i}>
        <TouchableOpacity style={styles.item} key={i} onPress={() => onPressItem(i)}>
          <Text style={styles.text}>{text}</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => onPressCross(i)}>
            <MaterialIcons name="clear" size={22} color="#333" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    )
  }

  // render list of items
  render() {
    const {list} = this.props
    return (
      <View>
        {list.map(this.renderItem)}
      </View>
    )
  }
}

// define style attributes
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 22,
    width: Layout.window.width,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    color: '#333',
  }
})