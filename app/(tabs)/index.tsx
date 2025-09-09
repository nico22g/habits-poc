import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchHabits } from '../store/habits/actions';
import { useAppDispatch } from '../store/habits/hooks';

export default function HomeScreen() {

  const habits = useSelector((state: any) => state.habits.habits);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  useEffect(() => {
    console.log('Habits from Redux Store:', habits);
  }, [habits]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}
