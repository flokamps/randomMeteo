export const getRandomCity = async (offset: number) => {
    const response = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?countryIds=FR&limit=1&offset=${offset}&hateoasMode=off`);
    const data = await response.json();
    return data.data[0];
}