import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

//Import ICONS reminder wk4
export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Settings
      </Text>
      <Text variant="bodyLarge" style={styles.body}>
        Settings options will go here.
      </Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: { marginBottom: 12, fontWeight: 'bold' },
  body:  { color: '#777' },
});
 