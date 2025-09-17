
import { Habit } from '@/app/types/habit';
import { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ListFilter from '../list-filter';
import HabitsListItem from './habit-list-item';

interface Props {
  habits: Habit[];
  categories: string[];
}

export const HabitList = ({habits, categories } : Props) =>{

  const renderItem = useCallback(({ item }: { item: Habit }) => (
    <HabitsListItem habit={item} />
  ), []);
  
  const renderHeader = useCallback(() => {
    return (
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Your Habits</Text>
        <Text style={{ fontSize: 16, color: '#666' }}>Track your daily habits and stay consistent!</Text>
        <ListFilter categories={categories}/>
        <View style={{ height: 20 }} />
      </View>
    );
  }, [categories]);

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