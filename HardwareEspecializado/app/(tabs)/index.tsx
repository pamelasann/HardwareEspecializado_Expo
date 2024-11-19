import React, { useState, useEffect } from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface LocationType {
  coords: LocationCoords;
}

const MostrarMapa: React.FC = () => {
  const [location, setLocation] = useState<LocationType | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso de localización negado');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const defaultRegion: Region = {
    latitude: location?.coords.latitude || 37.78825,
    longitude: location?.coords.longitude || -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView style={{ flex: 1 }} region={defaultRegion}>
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
  );
};

export default MostrarMapa;
