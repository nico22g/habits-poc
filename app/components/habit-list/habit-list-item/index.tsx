
import React from 'react';



import { Habit } from '@/app/types/habit';
import { formatDate } from '@/app/utils/date';
import { Text, View } from 'react-native';
import styles from './styles';

type HabitsListItemProps = {
  habit: Habit;
};

const HabitsListItem: React.FC<HabitsListItemProps> = ({ habit }) => {
  
  return (
    <View>
        <View style={styles.item}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.name}>DO IT</Text>
              <Text style={styles.date}>{formatDate(habit.createdAt)}</Text>
            </View>
            <Text style={styles.title}>{habit.name}</Text>
            <Text style={styles.description} numberOfLines={3}>
              {habit.description || 'No description provided.' }
            </Text>
          </View>
        </View>
    </View>
  );
};


export default HabitsListItem;