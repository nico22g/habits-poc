

import { Habit } from '@/app/types/habit';
import { Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import styles from './styles';

type HabitsListItemProps = {
  habit: Habit;
};

const HabitsListItem = ({ habit }: HabitsListItemProps) => {
  const rotationY = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      rotationY.value,
      [0, 1],
      [0, 180],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      rotationY.value,
      [0, 1],
      [180, 360],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    };
  });

  const tapGesture = Gesture.Tap().onEnd(() => {
    rotationY.value = withSpring(rotationY.value === 0 ? 1 : 0);
  });

  return (
    <GestureDetector gesture={tapGesture}>
      <View style={styles.container}>
        <Animated.View style={[styles.item, frontAnimatedStyle]}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.name}>COMPLETED</Text>
              <Text style={styles.date}>Congratulations!</Text>
            </View>
            <Text style={styles.title}>{habit.name}</Text>
            <Text style={styles.description} numberOfLines={3}>
              {habit.description || 'No description provided.'}
            </Text>
          </View>
        </Animated.View>
        <Animated.View style={[styles.item, styles.backItem, backAnimatedStyle]}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.name}>PENDING</Text>
            </View>
            <Text style={styles.title}>{habit.name}</Text>
            <Text style={styles.description} numberOfLines={3}>
              {habit.description || 'No description provided.'}
            </Text>
          </View>
          <Text style={styles.date}>{`Hurry up! Tap on here to mark your habit as completed :)`} </Text>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default HabitsListItem;