
import { HabitGraphData } from '@/app/types/habit';
import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";

interface HabitsLineChartProps {
    data: HabitGraphData;
}

const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 0, // optional, defaults to 2dp
    propsForDots: {
        r: "6",
        strokeWidth: "1",
        stroke: "white"
    },
    propsForLabels: {
        fontSize: 16,
        fontWeight: '600',
    },
};

export const HabitsLineChart = ({ data }: HabitsLineChartProps) => {
    const screenWidth = Dimensions.get("window").width;
    const height = Dimensions.get("window").height - 180;

    return (
        <LineChart
            data={data}
            width={screenWidth}
            height={height}
            chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={{  }}
        />
    );
}