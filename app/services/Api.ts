const API_URL = "https://68c097c10b196b9ce1c4aa9b.mockapi.io/api/v1/";

export async function fetchData(endpoint: string) {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}