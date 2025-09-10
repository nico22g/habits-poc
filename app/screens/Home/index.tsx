import { HabitList } from '@/app/components/habit-list';
import { fetchHabits } from '@/app/store/habits/actions';
import { useAppDispatch } from '@/app/store/habits/hooks';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import styles from './styles';


export default function HomeScreen() {
  const habits = useSelector((state: any) => state.habits.habits);
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);
  
  return (
    <View style={[styles.container , { paddingTop: insets.top}]}>
      <HabitList habits={habits} />
    </View>
  );
}
