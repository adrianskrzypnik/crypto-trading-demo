import { useState, useEffect } from 'react';
import {fetchCoinPrice} from "../../lib/api";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import usePortfolioStore from '@/store/usePortfolioStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Portfolio() {
    const { funds, assets, transactions, resetPortfolio } = usePortfolioStore();
    const [updatedAssets, setUpdatedAssets] = useState(assets);

    const handleResetPortfolio = () => {
        resetPortfolio();
        toast.success('Portfel został zresetowany');
    };

    // Funkcja do pobierania aktualnych cen dla wszystkich coinów
    const fetchCurrentPrices = async () => {
        const updatedAssetsWithPrices = { ...assets }; // Tworzymy kopię obiektu assets
        for (const key in updatedAssetsWithPrices) {
            if (updatedAssetsWithPrices[key].id) {
                const currentPrice = await fetchCoinPrice(updatedAssetsWithPrices[key].id);
                updatedAssetsWithPrices[key].current_price = currentPrice; // Uaktualniamy cenę coina
            }
        }
        setUpdatedAssets(updatedAssetsWithPrices); // Zaktualizuj stan z nowymi cenami
    };

    useEffect(() => {
        fetchCurrentPrices(); // Ładowanie cen po załadowaniu komponentu
    }, [assets]); // Uruchom ponownie, gdy assets się zmieni

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Stan Portfela</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-semibold">Dostępne środki: ${funds.toFixed(2)}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Twoje Aktywa</CardTitle>
                </CardHeader>
                <CardContent>
                    {Object.keys(updatedAssets).length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nazwa</TableHead>
                                    <TableHead>Symbol</TableHead>
                                    <TableHead>Ilość</TableHead>
                                    <TableHead>Średnia cena zakupu</TableHead>
                                    <TableHead>Aktualna cena</TableHead>
                                    <TableHead>Wartość</TableHead>
                                    <TableHead>PnL</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.values(updatedAssets).map((asset) => {
                                    const currentValue = asset.amount * asset.current_price;
                                    const totalCost = asset.amount * (asset.averagePrice || 0);
                                    const pnl = currentValue - totalCost;

                                    return (
                                        <TableRow key={asset.id}>
                                            <TableCell>{asset.name}</TableCell>
                                            <TableCell>{asset.symbol.toUpperCase()}</TableCell>
                                            <TableCell>{asset.amount?.toFixed(6)}</TableCell>
                                            <TableCell>${asset.averagePrice?.toFixed(2) || '0.00'}</TableCell>
                                            <TableCell>${asset.current_price.toFixed(2)}</TableCell>
                                            <TableCell>${currentValue.toFixed(2)}</TableCell>
                                            <TableCell className={pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
                                                ${pnl.toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-sm text-gray-500">Brak aktywów w portfelu.</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Historia Transakcji</CardTitle>
                </CardHeader>
                <CardContent>
                    {transactions.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Typ</TableHead>
                                    <TableHead>Symbol</TableHead>
                                    <TableHead>Ilość</TableHead>
                                    <TableHead>Cena</TableHead>
                                    <TableHead>Wartość</TableHead>
                                    <TableHead>Data</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((transaction, index) => (
                                    <TableRow key={index}>
                                        <TableCell className={transaction.type === 'buy' ? 'text-green-500' : 'text-red-500'}>
                                            {transaction.type === 'buy' ? 'Kupno' : 'Sprzedaż'}
                                        </TableCell>
                                        <TableCell>{transaction.symbol.toUpperCase()}</TableCell>
                                        <TableCell>{transaction.amount.toFixed(6)}</TableCell>
                                        <TableCell>${transaction.price.toFixed(2)}</TableCell>
                                        <TableCell>
                                            {transaction.type === 'buy'
                                                ? `-${transaction.cost?.toFixed(2)}`
                                                : `+${transaction.revenue?.toFixed(2)}`}
                                        </TableCell>
                                        <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-sm text-gray-500">Brak transakcji.</p>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button variant="destructive" onClick={handleResetPortfolio}>
                    Zresetuj Portfel
                </Button>
            </div>
        </div>
    );
}
