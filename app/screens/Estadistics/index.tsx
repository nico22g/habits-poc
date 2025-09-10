import { HabitsLineChart } from '@/app/components/habits-line-chart';
import { convertHabitsToGraphData } from '@/app/store/habits/actions';
import { useAppDispatch, useAppSelector } from '@/app/store/habits/hooks';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';


export default function EstadisticsScreen() {
    const habitsAsAGraphData = useAppSelector((state) => state.habits.habitGraphData);
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        dispatch(convertHabitsToGraphData());
    }, []);

    return (
        <View style={{ flex: 1, paddingTop: insets.top }}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    How many habits have you completed this week?
                </Text>
                <Text style={styles.headerSubtitle}>Let's check them out!</Text>
                <View style={{ height: 2 }} />
            </View>
            <HabitsLineChart data={habitsAsAGraphData} />
        </View>)
        ;
}
