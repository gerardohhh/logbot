// import React
import React, { Component } from 'react'

// import React Native components
import { AppRegistry, TextInput, StyleSheet } from 'react-native'

// export Input class
export default class Input extends Component {

  // define initial state of empty input component
  state = {
    text: '',
  }

  // set new state upon changing text
  onChangeText = (text) => {
    this.setState({text})
  }

  onSubmitEditing = () => {
    const {onSubmitEditing} = this.props
    const {text} = this.state

    // do not submit text if empty
    if (!text) return 
    onSubmitEditing(text)
    this.setState({text: ''})
  }

  render() {
    const {onSubmitEditing, placeholder} = this.props
    const {text} = this.state

    // render input component
    return (
      <TextInput
        style={styles.input}
        value={text}
        placeholder={placeholder}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
      />
    )
  }
}

// define style attributes
const styles = StyleSheet.create({
  input: {
    padding: 22,
    height: 70,
    borderWidth: 1,
    borderColor: '#ccc',
  },
})