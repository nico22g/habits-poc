export interface Habit {
  id: string;
  name: string;
  createdAt: Date;
  isCompleted: boolean;
  completedAt?: Date;
}