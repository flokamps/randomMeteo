export const getCityWeather = async (lat: string, long: string) => {
    const response = await fetch(`https://api.open-meteo.com/v1/meteofrance?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,rain,snowfall,weather_code,cloud_cover&forecast_days=1`)
    return await response.json();
}