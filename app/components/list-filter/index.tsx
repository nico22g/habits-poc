import { setFilterByCategory } from "@/app/store/habits/actions";
import { useAppDispatch } from "@/app/store/habits/hooks";
import { useCallback } from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
    categories: string[]
}
const ListFilter = ({ categories }: Props) => {
    const dispatch = useAppDispatch();
    const renderCategories = useCallback(() => {
        const filterByCategory = (category: string) => {
            dispatch(setFilterByCategory(category))
        };
        return categories.map((category) => (
            <Pressable onPress={() => filterByCategory(category)}>
                <View style={{ backgroundColor: '#e26a00', borderRadius: 6, padding: 10, marginRight: 6 }}>
                    <Text style={{ color: 'white' }}>{category}</Text>
                </View>
            </Pressable>
        ))
    }, [categories])
    return (
        <>
            <Text style={{ fontSize: 16, color: '#666', paddingTop: 10 }} >Filter by: </Text>
            <View style={{ flex: 1, flexDirection: 'row'}}>
                {renderCategories()}
            </View>
        </>
    );
};

export default ListFilter;