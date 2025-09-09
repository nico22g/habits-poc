import { Habit } from '@/app/types/habit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchHabits } from '../actions';


interface HabitsState {
  habits: Habit[];
}
interface HabitState extends HabitsState {
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  error: null,
}

const habits = createSlice({
  name: 'habits',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchHabits.fulfilled,
      (state, action) => {
        state.habits = action.payload.payload;
      }
    ).addCase(
      fetchHabits.rejected,
      (state, action) => {
        state.error = action.error.message || 'Failed to fetch habits';
      }
    ).addCase(
      fetchHabits.pending,
      (state) => {
        state.error = null  // Reset error on pending;
      }
    );
  },
});

export default habits.reducer;
