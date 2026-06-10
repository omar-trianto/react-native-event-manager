import * as React from 'react';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Card, Chip, Text, Searchbar, TextInput } from 'react-native-paper';
import { useTheme } from '../ThemeContext';

export default function HomeScreen({ navigation }) {
    const { colors } = useTheme();

// calls for remote data here
const [events, setEvents] = React.useState([]);
const [loading, setLoading] = React.useState(false); //Add cool spin animation part2
const [error, setError] = React.useState('');

const EVENTS_URL = 'https://tafeshaun.github.io/elevate-data/events.json';
const EVENT_KEY = 'cached_events';

const loadEvents = async () => {
    try{
        setLoading(true);
        setError('');
        const response = await fetch(EVENTS_URL);
        if(!response.ok){
            throw new Error('Network response failed.')
        }
        const text = await response.text();
        const cleaned = text.replace(/^\uFEFF/, ''); //Clean
        const data = JSON.parse(cleaned);
        setEvents(data);
        await AsyncStorage.setItem(EVENT_KEY, JSON.stringify(data));
    }
    catch (e){
        setError('Could not load any events.');
        console.error(e);
    }
    finally {
        setLoading(false);
    }
 
}

// aysnc call if load fails > use cache first
const loadCached = async () => {
    try{
        const rawEvent = await AsyncStorage.getItem(EVENT_KEY);
        if(rawEvent)
        {
            setEvents(JSON.parse(rawEvent))
        }
    }
    catch (e){
        console.warn('Failed to load cached event data', e);
    }
};

React.useEffect(() => {
    loadCached(); //CACHED DATA
    loadEvents(); // REMOTE DATA
}, []);

    const [searchQuery, setSearchQuery] = React.useState("");
    const [filteredData, setFilteredData] = React.useState(events);

    // filter events by title or date based on search query
    const filteredEvents = events.filter(e => {
        const q = searchQuery.toLowerCase();
        return (
        e.title.toLowerCase().includes(q) ||
        e.date.toLowerCase().includes(q)
        );
    });

    // make chips selectable
    const [selectedChips, setSelectedChips] = React.useState([]);

    const tags = ['Athletics', 'Today', 'Fitness', 'Music', 'Social', 'Outdoors', 'Family'];

    const handlePress = (tag) => {
        if (selectedChips.includes(tag)) {
            setSelectedChips(selectedChips.filter((item) => item !== tag));
        } 
        else {
            setSelectedChips([...selectedChips, tag]);
        }
    };

    return (
        <ScrollView style={[styles.container, {backgroundColor: colors.primary}]}>
            <Card style={[styles.card, {backgroundColor: colors.background}]}>
                <Card.Content>
                    <Text variant="headlineMedium" style={[styles.title, {color: colors.text}]}>
                        Welcome
                    </Text>
                    <Text variant="bodyLarge" style={{color: colors.text}}>
                        Find and register for Community Events
                    </Text>
                    <Button mode='outlined' style={{marginTop: '20px'}} textColor={colors.text}
                        onPress={() => navigation.navigate('Events')}
                    >View Today's Events</Button>
                </Card.Content>
            </Card>
            <Searchbar
                style={[styles.card, {backgroundColor: colors.background}]}
                inputStyle={{ color: colors.text }}
                placeholderTextColor="gray"
                placeholder="Search Events..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {tags.map((tag) => (
                    <Chip
                    key={tag}
                    selected={selectedChips.includes(tag)}
                    onPress={() => handlePress(tag)}
                    style={[styles.chip, {backgroundColor: colors.background}]}
                    textStyle={{color: colors.text}}
                    selectedColor="#DDAB5E" 
                    >
                        {tag}
                    </Chip>
                ))}
            </View>

            <Text variant='bodyMedium' style={{ marginLeft: 12, color: colors.text }}>
                Showing {filteredEvents.length} event(s)
            </Text>

{/* ADD ERROR MSG HERE FOR LATER TESTING */}
{!!error && <Text style={{color: '#ff0000'}}>{error}</Text>}

{/* Add cool spin animation part2 */}
{loading && <ActivityIndicator animating size="large" style={{ marginTop: 80 }} />}

{filteredEvents.map(event => (
<Card
    key={String(event.id)}
    style={[styles.card, {backgroundColor: colors.background}]}
    onPress={() => navigation.navigate("Details", { item: event })} //PARAMS!
>
    {/* Added subtitle to show date field from the remote JSON */}
    <Card.Title title={event.title} subtitle={event.date} titleStyle={{color: colors.text}} subtitleStyle={{color: colors.text}}/>
        <Card.Content>
            <Text variant="bodyMedium" style={{color: colors.text}}>{event.description}</Text>
        </Card.Content>
</Card>
))}


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:  {flex: 1, padding: 8,},
    title:      { marginBottom: 12, fontWeight: 'bold', },
    card:       { margin: 12 },
    chip:       { margin: 4 },
});