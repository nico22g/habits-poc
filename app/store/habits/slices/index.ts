import { Habit, HabitGraphData } from '@/app/types/habit';
import { createSlice } from '@reduxjs/toolkit';
import { convertHabitsToGraphData, fetchHabits } from '../actions';



interface HabitsState {
  habits: Habit[];
  habitGraphData: HabitGraphData;
}
interface HabitState extends HabitsState {
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  error: null,
  habitGraphData: {
    labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    datasets: [
        {
            data: [0, 0, 0, 0, 0, 0, 0]
        }
    ]
},
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
    builder.addCase(
      convertHabitsToGraphData.fulfilled,
      (state, action) => {
        state.habitGraphData = action.payload.payload;
      }
    ).addCase(
      convertHabitsToGraphData.rejected,
      (state, action) => {
        state.error = action.error.message || 'Failed to fetch habits';
      }
    ).addCase(
      convertHabitsToGraphData.pending,
      (state) => {
        state.error = null  // Reset error on pending;
      }
    );
  },
});

export default habits.reducer;
