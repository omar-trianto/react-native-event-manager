import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider} from 'react-native-paper';

import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <PaperProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: '#f00084',
                tabBarInactiveTintColor: '#999',
                headerStyle: {backgroundColor: '#6200ee'},
                headerTintColor: '#fff',
              }}
            >

            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen}/>
            
            </Tab.Navigator>
          </NavigationContainer>
      </PaperProvider>
  );
}