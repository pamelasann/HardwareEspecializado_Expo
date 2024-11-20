import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { View, StyleSheet, Button } from 'react-native';
import { useRouter } from "expo-router"

interface LocationCoords {
    latitude: number;
    longitude: number;
}

interface MapaProps {
    showsTraffic: boolean;
}

interface Restaurant {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export default function Mapa() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [showTraffic, setShowTraffic] = useState(false);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const router = useRouter();
    
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permiso de localización negado');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            if (location) {
              fetchRestaurants(location.coords.latitude, location.coords.longitude);
          }
        })();
    }, []);

    const fetchRestaurants = async (latitude: number, longitude: number) => {
      const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
      const radius = 1000; 
      const type = 'restaurant';

      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${API_KEY}`;
      
      try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.results) {
              const parsedRestaurants = data.results.map((place: any) => ({
                  id: place.place_id,
                  name: place.name,
                  latitude: place.geometry.location.lat,
                  longitude: place.geometry.location.lng,
              }));
              setRestaurants(parsedRestaurants);
          } else {
              console.log('No nearby places found.');
          }
      } catch (error) {
          console.error('Error fetching restaurants:', error);
      }
  };

    return (
      <View style={styles.mainContainer}>
        <MapView
            style={styles.container}
            region={{
            latitude: location?.coords.latitude || 37.78825,
            longitude: location?.coords.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
            showsTraffic={showTraffic}
        >
        {location && (
            <Marker
            coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }}
            title="Mi ubicación"
            />
        )}
        {restaurants.map((restaurant) => (
            <Marker
                key={restaurant.id}
                coordinate={{
                    latitude: restaurant.latitude,
                    longitude: restaurant.longitude,
                }}
                title={restaurant.name}
                pinColor="red"
            />
        ))}
        </MapView>

        <View style={styles.homeBtnContainer}>
          <Button title='Back Home' color="#841584" onPress={() => router.push('/home')}></Button>
        </View>
        <View style={styles.trafficBtnContainer}>
          <Button title='Show Traffic' color="#818181" onPress={() => setShowTraffic(!showTraffic)}></Button>
        </View>
       
      </View>
        
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    map: {
        zIndex: 0,
    },
    homeBtnContainer: {
      position: 'absolute',
      width: 100,
      top: 10,
      left: 10,
    },
    trafficBtnContainer: {
      position: 'absolute',
      width: 150,
      top: 10,
      right: 10,
    },
});