export const getCachedLocation = (query: string, isPickUp: boolean) => {
    const cacheKey = isPickUp ? "pickUpCache" : "dropOffCache";
    const cache = localStorage.getItem(cacheKey);

    if (cache) {
        const parsedCache = JSON.parse(cache);
        return parsedCache[query] || null;
    }

    return null;
};

export const setCachedLocation = (query: string, data: any, isPickUp: boolean) => {
    const cacheKey = isPickUp ? "pickUpCache" : "dropOffCache";
    const cache = localStorage.getItem(cacheKey);
    const parsedCache = cache ? JSON.parse(cache) : {};

    parsedCache[query] = data;
    localStorage.setItem(cacheKey, JSON.stringify(parsedCache));
};
