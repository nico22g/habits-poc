import { HabitList } from '@/app/components/habit-list';
import { fetchHabits, getCategoriesFromHabits } from '@/app/store/habits/actions';
import { useAppDispatch } from '@/app/store/habits/hooks';
import { Habit } from '@/app/types/habit';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import styles from './styles';


export default function HomeScreen() {
  const habits = useSelector((state: any) => state.habits.habits);
  const filterByCategory = useSelector((state: any) => state.habits.filterByCategory);
  const categories = useSelector((state: any) => state.habits.categories);
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  useEffect(() => {
    dispatch(getCategoriesFromHabits());
  },[habits])
  
  const filteredHabits = filterByCategory
    ? habits.filter((habit: Habit) => (habit.category === filterByCategory))
    : habits;
  return (
    <View style={[styles.container , { paddingTop: insets.top}]}>
      <HabitList habits={filteredHabits} categories={categories}/>
    </View>
  );
}
