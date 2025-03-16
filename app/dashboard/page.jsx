'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CoinList from '@/components/crypto/CoinList';
import TradingForm from '@/components/crypto/TradingForm';
import Portfolio from '@/components/crypto/Portfolio';
import PriceChart from '@/components/charts/PriceChart';
import usePortfolioStore from '@/store/usePortfolioStore';

export default function DashboardPage() {
    const [selectedCoin, setSelectedCoin] = useState(null);
    const { funds, assets, transactions, buyCoin, sellCoin } = usePortfolioStore();

    const handleTrade = (tradeDetails) => {
        try {
            if (tradeDetails.action === 'buy') {
                buyCoin(
                    tradeDetails.coin,
                    tradeDetails.amount,
                    tradeDetails.price
                );
            } else {
                sellCoin(
                    tradeDetails.coin,
                    tradeDetails.amount,
                    tradeDetails.price
                );
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Demo Trading Kryptowalut</h1>
                <div className="text-xl">
                    Dostępne środki: <span className="font-bold">${funds.toFixed(2)}</span>
                </div>
            </div>

            <Tabs defaultValue="market">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="market">Rynek</TabsTrigger>
                    <TabsTrigger value="portfolio">Portfel</TabsTrigger>
                    <TabsTrigger value="transactions">Transakcje</TabsTrigger>
                </TabsList>

                <TabsContent value="market" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Rynek kryptowalut</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CoinList onSelectCoin={setSelectedCoin} />
                                </CardContent>
                            </Card>
                        </div>

                        <div>
                            {selectedCoin ? (
                                <>
                                    <TradingForm
                                        coin={selectedCoin}
                                        onTrade={handleTrade}

                                    />
                                    <div className="mt-6">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Wykres ceny</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <PriceChart coinId={selectedCoin.id} />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </>
                            ) : (
                                <Card>
                                    <CardContent className="pt-6">
                                        <p className="text-center text-muted-foreground">
                                            Wybierz kryptowalutę z listy, aby rozpocząć handel
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="portfolio">
                    <Card>
                        <CardHeader>
                            <CardTitle>Twój portfel</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Portfolio />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="transactions">
                    <Card>
                        <CardHeader>
                            <CardTitle>Historia transakcji</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2">Data</th>
                                        <th className="text-left py-2">Typ</th>
                                        <th className="text-left py-2">Kryptowaluta</th>
                                        <th className="text-right py-2">Ilość</th>
                                        <th className="text-right py-2">Cena</th>
                                        <th className="text-right py-2">Wartość</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transactions.length > 0 ? (
                                        transactions.map((tx, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="py-2">{new Date(tx.date).toLocaleString()}</td>
                                                <td className={`py-2 ${tx.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                                                    {tx.type === 'buy' ? 'Kupno' : 'Sprzedaż'}
                                                </td>
                                                <td className="py-2">{tx.symbol.toUpperCase()}</td>
                                                <td className="py-2 text-right">{tx.amount}</td>
                                                <td className="py-2 text-right">${tx.price.toFixed(2)}</td>
                                                <td className="py-2 text-right">
                                                    ${tx.type === 'buy' ? tx.cost.toFixed(2) : tx.revenue.toFixed(2)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="py-4 text-center text-muted-foreground">
                                                Brak transakcji
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}