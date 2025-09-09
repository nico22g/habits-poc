import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { getHabits } from '../services/habits/HabitService';

export default function HomeScreen() {
  useEffect(() => {
  
    const fetchHabits = async () => {
      try {
        const response = await getHabits();
        console.log('Habits:', response);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };
    fetchHabits();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}
