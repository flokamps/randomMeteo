export const getCityDescriptionAndLink = async (city: string): Promise<Object> => {
    const response = await fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${city}`);
    const data = await response.json();
    if (data.extract === undefined)
        return { desc: "Aucune description disponible pour cette ville.", link: "" };
    return { desc: data.extract, wikiLink: data.content_urls.desktop.page };
}