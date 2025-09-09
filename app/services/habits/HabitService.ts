
import { fetchData } from "../Api";

export async function getHabits() {
    return fetchData("habits");
}   