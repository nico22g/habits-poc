
import { getHabits } from '@/app/services/habits/HabitService';
import { Habit } from '@/app/types/habit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

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

