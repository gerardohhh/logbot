// import React
import React from 'react';
// import React Native components
import {
  StyleSheet,
  View,
} from 'react-native';

// import components from Exponent navigation library
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';

// import tab icons
import {Ionicons} from '@exponent/vector-icons';

// import icon colors
import Colors from '../constants/Colors';

// export RootNavigation class
export default class RootNavigation extends React.Component {
  render() {
    return (
      // render footer tabs 
      <TabNavigation
        tabBarHeight={56}
        initialTab="home">
        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderIcon('ios-home', isSelected)}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>
        <TabNavigationItem
          id="settings"
          renderIcon={isSelected => this._renderIcon('ios-information-circle', isSelected)}>
          <StackNavigation initialRoute="settings" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  // define icon attributes
  _renderIcon(name, isSelected) {
    return (
      <Ionicons
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}

// define style attributes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});
