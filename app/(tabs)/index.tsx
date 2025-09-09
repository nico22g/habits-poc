import { useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { HabitList } from '../components/habit-list';
import { fetchHabits } from '../store/habits/actions';
import { useAppDispatch } from '../store/habits/hooks';

export default function HomeScreen() {

  const habits = useSelector((state: any) => state.habits.habits);
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);
  
  return (
    <View style={{ flex: 1, paddingTop: insets.top, alignItems: 'center', justifyContent: 'center' }}>
      <HabitList habits={habits} />
    </View>
  );
}
