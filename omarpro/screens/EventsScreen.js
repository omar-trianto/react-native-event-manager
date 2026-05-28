import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Events
      </Text>
      <Text variant="bodyLarge" style={styles.body}>
        EVENTS PLACEHOLDER
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3CA6E5',
  },
  title: { marginBottom: 12, fontWeight: 'bold', color: '#424754' },
  body:  { color: '#424754' },
});