export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  isCompleted: boolean;
  completedAt?: Date;
  description: string;
  category: string;
}

export interface HabitGraphData {
  labels: string[];
  datasets: { data: number[] }[];
}