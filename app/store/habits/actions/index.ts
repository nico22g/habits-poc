
import { getHabits } from '@/app/services/habits/HabitService';
import { Habit } from '@/app/types/habit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { RootState } from '../..';

export const fetchHabits = createAsyncThunk('/habits/fetchHabits', async () => {
  let response;
  const habitsAsync = await AsyncStorage.getItem('habits');  
  if (habitsAsync === null || habitsAsync.length === 0) {
    // Fetch from Habits Service if we don't have async data in AsyncStorage
    response = await getHabits();
    if (!response) {
	    return { payload: [] as Habit[] }; 
    } 
  }
  return { payload: response};
})


const groupedByWeek = (items: Habit[])  => items.reduce((acc: Record<string, Habit[]>, item) => {
  const dateAsDayJs = dayjs(item.completedAt);
  const dayOfTheWeek = dateAsDayJs.format('ddd');
  if (!acc[dayOfTheWeek]) {
    acc[dayOfTheWeek] = [];
  }
  acc[dayOfTheWeek].push(item);
  return acc;
}, {});

const getHabitsForCurrentWeek = (habits: Habit[]) => {
  const startOfWeek = dayjs().startOf('week');
  const endOfWeek = dayjs().endOf('week');
  return habits.filter(habit => {
    if (!habit.isCompleted || !habit.completedAt) {
      return false; // Skip if not completed
    }
    const dateAsDayJs = dayjs(habit.completedAt);
    return dateAsDayJs.isAfter(startOfWeek) && dateAsDayJs.isBefore(endOfWeek);
  });
}
  
export const convertHabitsToGraphData = createAsyncThunk('/habits/convertHabitsToGraphData', async (_, thunkAPI) => {
  let response;
  const state = thunkAPI.getState() as RootState;
  const habits = state.habits.habits;
  if (habits.length > 0) {
    // Filter habits for the current week
    const currentWeekHabits = getHabitsForCurrentWeek(habits);
    // Sort habits by completedAt date
    const sortedArray = currentWeekHabits.sort((a, b) => {
      if (!a.completedAt || !b.completedAt) return 0;
      return a.completedAt < b.completedAt ? -1 : 1;
    });
    // Group habits by week
    const grouped = groupedByWeek(sortedArray);
    // Taking labels dinamically from the grouped object keys
    const labels = Object.keys(grouped);
    const datasets = [{
      data: labels.map(week => grouped[week].filter((habit: Habit) => habit.isCompleted).length)
    }];
    response = { labels, datasets };
  } else {
    response = { labels: [], datasets: [] };
  }
  return { payload: response};
})
