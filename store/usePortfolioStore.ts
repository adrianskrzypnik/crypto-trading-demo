import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definicje typów
interface Coin {
    id: string;
    symbol: string;
    name: string;
    amount?: number;
}

interface Transaction {
    type: 'buy' | 'sell';
    coinId: string;
    symbol: string;
    amount: number;
    price: number;
    cost?: number;
    revenue?: number;
    date: Date;
}

interface PortfolioState {
    funds: number;
    assets: Record<string, Coin>;
    transactions: Transaction[];

    buyCoin: (coin: Coin, amount: number, price: number) => void;
    sellCoin: (coin: Coin, amount: number, price: number) => void;
    resetPortfolio: () => void;
}

const usePortfolioStore = create<PortfolioState>()(
    persist(
        (set, get) => ({
            funds: 10000, // Startowe fundusze w USD
            assets: {}, // Posiadane kryptowaluty
            transactions: [], // Historia transakcji

            buyCoin: (coin, amount, price) => {
                const cost = amount * price;
                const { funds, assets } = get();

                if (cost > funds) {
                    throw new Error('Niewystarczające środki');
                }

                set((state) => ({
                    funds: state.funds - cost,
                    assets: {
                        ...state.assets,
                        [coin.id]: {
                            ...coin,
                            amount: (state.assets[coin.id]?.amount || 0) + amount,
                        },
                    },
                    transactions: [
                        {
                            type: 'buy',
                            coinId: coin.id,
                            symbol: coin.symbol,
                            amount,
                            price,
                            cost,
                            date: new Date(),
                        },
                        ...state.transactions,
                    ],
                }));
            },

            sellCoin: (coin, amount, price) => {
                const { assets } = get();
                const currentAmount = assets[coin.id]?.amount || 0;

                if (amount > currentAmount) {
                    throw new Error('Niewystarczająca ilość');
                }

                const revenue = amount * price;

                set((state) => ({
                    funds: state.funds + revenue,
                    assets: {
                        ...state.assets,
                        [coin.id]: {
                            ...coin,
                            amount: currentAmount - amount,
                        },
                    },
                    transactions: [
                        {
                            type: 'sell',
                            coinId: coin.id,
                            symbol: coin.symbol,
                            amount,
                            price,
                            revenue,
                            date: new Date(),
                        },
                        ...state.transactions,
                    ],
                }));

                // Usuń aktywa, jeśli ilość wynosi 0
                if (get().assets[coin.id]?.amount === 0) {
                    set((state) => {
                        const newAssets = { ...state.assets };
                        delete newAssets[coin.id];
                        return { assets: newAssets };
                    });
                }
            },

            resetPortfolio: () => {
                set({
                    funds: 10000,
                    assets: {},
                    transactions: [],
                });
            },
        }),
        {
            name: 'crypto-portfolio',
        }
    )
);

export default usePortfolioStore;
