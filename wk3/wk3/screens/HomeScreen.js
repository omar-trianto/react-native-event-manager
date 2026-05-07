import { View, StyleSheet} from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text variant='headlineMedium' style={styles.title}>
                Home Screen Place Holder
            </Text>
            <Text variant='bodyLarge' style={styles.subtitle}>
                Welcome to the homescreen of my app. This is a placeholder Lorium Ipsuim    
            </Text> 

            <Button
            textColor='#0f0f0f'
            style={styles.button}
            >
                Placeholder BTN
            </Button> 
        </View>
    );
}

//PASTE STYLES HERE LATER
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 24,
        backgroundColor: '#98d6ff'
    },
    title: {
        marginBottom:12,
        fontWeight: 'bold',
        color: '#595959',
    },
    subtitle: {
        textAlign: 'center', 
        marginBottom:24, 
        color: '#be5403'
    },
    button: {
        marginTop: 8,
        backgroundColor: '#ed019a',
    },
});