// import React
import React from 'react'
// import React Native components
import { 
  ActivityIndicator,
  AppRegistry, 
  AsyncStorage,
  Image, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native'

// import components from Exponent
import Exponent, {
  Components,
  Location,
} from 'exponent';

// import List and Input components
import Input from '../components/Input'
import List from '../components/List'

const { MapView } = Components;
const { Permissions } = Exponent;

export default class HomeScreen extends React.Component {
  // retrieve location and data from previous sessions upon screen loading
  componentDidMount() {
    this._findLocation();
    try {
      // run through array of 2500 keys to check for item objects
      for (var i = 0; i < 2500; i++) {
        AsyncStorage.getItem(i.toString()).then((value) => {
          if( value != null ) {
            // convert item string into item object
            var info = eval('(' + value + ')');
            // updates state of item list
            const {items} = this.state
            this.items.push( info )
            this.setState({items: [ info.name, ...items] })
          }
        }).done();
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  // track item names and state of location retrieval
  state = {
    items: [],
    location: null,
    searching: false,
  };

  // check for permissions and retrieve location
  _findLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return;
    }

    try {
      let result = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
      this.setState({location: result});
    } finally {
      this.setState({searching: false});
    }
  }

  items = []
  // create item object and push to items array
  onAddItem = (text) => {
    const {items} = this.state
    const newItem = {
      name: text,
      time: new Date().toLocaleTimeString(),
      latitude: this.state.location.coords.latitude + Math.random() * .00002,
      longitude: this.state.location.coords.longitude - Math.random() * .00002,
      id: Math.floor(Math.random() * 2500),
    }

    this.setState({
      items: [...items, text],
    })

    this.items.push(newItem)
    this._findLocation()
    // store item in AsyncStorage
    AsyncStorage.setItem(newItem.id.toString(), JSON.stringify(newItem));
  }

  // splice item object from array
  onRemoveItem = (index) => {
    const {items} = this.state

    this.setState({
      items: items.filter((item, i) => i !== index),
    })

    this.items.splice(index, 1)
    // removes items from asyncstorage
    if (this.items[index]) {
      AsyncStorage.removeItem(this.items[index].id.toString());
    }
  }

  // update location and timestamp
  updateLocation = (index) => {
    this._findLocation()

    const {items} = this.state

    const itemUpdated = {
      name: this.items[index].name,
      time: new Date().toLocaleTimeString(),
      latitude: this.state.location.coords.latitude + Math.random() * .00002,
      longitude: this.state.location.coords.longitude - Math.random() * .00002,
      id: this.items[index].name,
    }

    this.items[index].time = itemUpdated.time;
    this.items[index].latitude = itemUpdated.latitude;
    this.items[index].longitude = itemUpdated.longitude;

    AsyncStorage.setItem(itemUpdated.toString(), JSON.stringify(itemUpdated));    
  }

  render() {
    const {items} = this.state

    if (this.state.location) {
      return (
        <View>
          <MapView style={styles.map} showsUserLocation={true}
            initialRegion={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }} >
            {this.makeMarkers()}
          </MapView>
          <Input
            placeholder={'Add item'}
            onSubmitEditing={this.onAddItem}
          />
          <ScrollView>
            <List 
              list={items}
              onPressCross={this.onRemoveItem}
              onPressItem={this.updateLocation}
            />
          </ScrollView>
        </View>
      );
    }
    else {
      return (
        <View>
          <MapView style={styles.map} showsUserLocation={true} 
            initialRegion={{
              latitude: 42.3763,
              longitude: -71.1166,
              latitudeDelta: 0.015,
              longitudeDelta: 0.015,
            }} > 
            {this.makeMarkers()}
          </MapView>
          <Text style={styles.text}>Loading. Please ensure that you have location services enabled.</Text>
          <ScrollView>
            <ActivityIndicator animating={true} style={styles.activityInd} size="large" />
          </ScrollView>
        </View>
      );
    }
  }

  // create map markers
  makeMarkers() {
    return this.items.map((item) => {
      return <MapView.Marker
        coordinate={{latitude: item.latitude,
        longitude: item.longitude}}
        title={item.name}
        description={"Last Seen: " + item.time}
        key={Math.random() * 10000}
      />
    });
  }
}

// defines style attributes
const styles = StyleSheet.create({
  text: {
    backgroundColor: "#447ed6",
    color: "#fff",
    padding: 20,
    fontSize: 16,
  },
  map: {
    height: 250,
  },
  activityInd: {
    paddingTop: 50,
  }
});