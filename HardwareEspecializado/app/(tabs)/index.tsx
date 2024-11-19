import { View, Text, StyleSheet, Button } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
     <Text>Map</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
