import data from 'assets/json/cities_results.json';

export default defineEventHandler((event) => {
    const offset = Number.parseInt(<string>getRouterParam(event, 'offset')) || 50;
    return data[offset];
})