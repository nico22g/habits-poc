
import { Habit } from '@/app/types/habit';
import { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HabitsListItem from './habit-list-item';

interface Props {
  habits: Habit[];
}

const renderHeader = () => (
  <View>
    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Your Habits</Text>
    <Text style={{ fontSize: 16, color: '#666' }}>Track your daily habits and stay consistent!</Text>
    <View style={{ height: 20 }} />
  </View>
);

export const HabitList = ({habits} : Props) =>{

  const renderItem = useCallback(({ item }: { item: Habit }) => (
    <HabitsListItem habit={item} />
  ), []);
  
  const keyExtractor = (item: Habit) => item.id;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlatList
        data={habits}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        ListHeaderComponent={renderHeader}
      />
    </GestureHandlerRootView>
  );
}