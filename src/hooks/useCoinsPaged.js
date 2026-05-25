import { keepPreviousData, useQuery } from "@tanstack/react-query";

async function fetchCoinsPaged(page) {
    const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=${page}`,
    );

    if (!response.ok) {
        throw new Error("Unable to load paged coins. Please try again later.");
    }

    return response.json();
}

export function useCoinsPaged(page) {
    return useQuery({
        queryKey: ["coins", "paged", page],
        queryFn: () => fetchCoinsPaged(page),
        keepPreviousData: true,
        placeholderData: keepPreviousData,
    });
}
