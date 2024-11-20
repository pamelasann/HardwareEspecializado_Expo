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

export default function Mapa() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [showTraffic, setShowTraffic] = useState(false);

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
        })();
    }, []);

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