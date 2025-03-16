import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
});

interface CoinMarket {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    sparkline_in_7d?: { price: number[] };
}

interface CoinDetails {
    id: string;
    symbol: string;
    name: string;
    description: { en: string };
    image: { thumb: string; small: string; large: string };
    market_data: {
        current_price: { usd: number };
        market_cap: { usd: number };
        total_volume: { usd: number };
    };
}

interface MarketChart {
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

export const fetchCoins = async (page: number = 1, perPage: number = 50): Promise<CoinMarket[]> => {
    const response = await apiClient.get<CoinMarket[]>('/coins/markets', {
        params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: perPage,
            page: page,
            sparkline: true,
            price_change_percentage: '24h',
        },
    });
    return response.data;
};

export const fetchCoinDetails = async (coinId: string): Promise<CoinDetails> => {
    const response = await apiClient.get<CoinDetails>(`/coins/${coinId}`);
    return response.data;
};

export const fetchCoinHistory = async (coinId: string, days: number = 7): Promise<MarketChart> => {
    const response = await apiClient.get<MarketChart>(`/coins/${coinId}/market_chart`, {
        params: { vs_currency: 'usd', days: days },
    });
    return response.data;
};
