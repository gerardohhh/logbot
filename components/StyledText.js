// import React
import React from 'react';

// import React Native component
import { Text } from 'react-native';

// export MonoText class
export class MonoText extends React.Component {
	// define text attributes
    render() {
	    return (
	      <Text
	        {...this.props}
	        style={[this.props.style, {fontFamily: 'space-mono'}]}
	      />
    );
  }
}
