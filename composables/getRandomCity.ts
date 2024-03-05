export const getRandomCity = async (offset: number) => {
    const response = await $fetch(`/api/city/${offset}`);
    const data = await response.data;
    return data[0];
}