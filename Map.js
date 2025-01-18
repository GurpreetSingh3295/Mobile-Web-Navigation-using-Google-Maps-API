/*
 Author: Gurpreet Singh , 000901702
 Statement of Authorship: I Gurpreet Singh, 000901702 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
*/
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Keyboard, TouchableOpacity  } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Icon } from 'react-native-elements'; 

const GOOGLE_MAPS_APIKEY = 'AIzaSyBtloBaLUkiB9hZiIPtl5k3LNEMeYxW_2s';

/**
 * CustomMapApp component displays a map with markers and search functionality.
 * @returns {JSX.Element} JSX element of the CustomMapApp component.
 */
export default function CustomMapApp() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [search, setSearch] = useState('');

  const mapRef = useRef(null);

  useEffect(() => {
    // Fetches the current location when the component mounts
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

   // Handles long press on the map to add a new marker
  const handleLongPress = (event) => {
    const newMarker = {
      coordinate: event.nativeEvent.coordinate,
      title: `Custom Spot #${markers.length + 1}`,
      description: 'An interesting spot discovered by you!'
    };
    setMarkers([...markers, newMarker]);
  };
   // Handles search for a location and updates the map
  const handleSearch = async () => {
    Keyboard.dismiss();
    try {
      let results = await Location.geocodeAsync(search);
      if (results.length > 0) {
        mapRef.current.animateToRegion({
          latitude: results[0].latitude,
          longitude: results[0].longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }, 1000);
      } else {
        Alert.alert("Location not found");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to find the location due to an error.");
    }
  };
  // Handles zooming in on the map
  const handleZoomIn = () => {
    mapRef.current.animateToRegion({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: currentLocation.latitudeDelta / 2,
      longitudeDelta: currentLocation.longitudeDelta / 2,
    });
  };
  // Handles zooming out on the map
  const handleZoomOut = () => {
    mapRef.current.animateToRegion({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: currentLocation.latitudeDelta * 2,
      longitudeDelta: currentLocation.longitudeDelta * 2,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for places..."
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
      />
      <Button title="Search" onPress={handleSearch} />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={currentLocation}
        onLongPress={handleLongPress}
      >
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker.coordinate} title={marker.title} description={marker.description} />
        ))}
      </MapView>
      {errorMsg && <Text>{errorMsg}</Text>}
      <View style={styles.zoomButtons}>
        <TouchableOpacity onPress={handleZoomIn} style={styles.zoomButton}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleZoomOut} style={styles.zoomButton}>
          <Text>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
// Styles for the CustomMapApp component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 'auto',
    height: 'auto',
  },
  map: {
    flex: 1,
    width: 'auto',
    height: 'auto',
  },
  searchBar: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  zoomButtons: {
    position: 'absolute',
    bottom: 20,
    right: 160,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
  },
  zoomButton: {
    marginHorizontal: 5,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  }
});
const mapStyle = [
  // Include your custom map styles here if needed
];