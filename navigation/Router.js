// import component from Exponent navigation library
import {
  createRouter,
} from '@exponent/ex-navigation';

// import different screens
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';

// defines screen routes
export default createRouter(() => ({
  home: () => HomeScreen,
  settings: () => SettingsScreen,
}));
