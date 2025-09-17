import { Habit, HabitGraphData } from '@/app/types/habit';
import { createSlice } from '@reduxjs/toolkit';
import { convertHabitsToGraphData, fetchHabits, getCategoriesFromHabits, setFilterByCategory } from '../actions';



interface HabitsState {
  habits: Habit[];
  habitGraphData: HabitGraphData;
  categories: string[];
  filterByCategory?: string;
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
  categories: [],
  filterByCategory: undefined,
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
    builder.addCase(
      getCategoriesFromHabits.fulfilled,
      (state, action) => {
        state.categories = action.payload.payload;
      }
    ).addCase(
      getCategoriesFromHabits.rejected,
      (state, action) => {
        state.error = action.error.message || 'Failed to fetch categories';
      }
    ).addCase(
      getCategoriesFromHabits.pending,
      (state) => {
        state.error = null  // Reset error on pending;
      }
    );
    builder.addCase(
      setFilterByCategory.fulfilled,
      (state, action) => {
        state.filterByCategory = action.payload.payload;
      }
    ).addCase(
      setFilterByCategory.rejected,
      (state, action) => {
        state.error = action.error.message || 'Failed to fetch categories';
      }
    ).addCase(
      setFilterByCategory.pending,
      (state) => {
        state.error = null  // Reset error on pending;
      }
    );
  },
});

export default habits.reducer;
