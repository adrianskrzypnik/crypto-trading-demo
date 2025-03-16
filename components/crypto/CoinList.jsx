import { useState } from 'react';
import useSWR from 'swr';
import { fetchCoins } from '@/lib/api';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function CoinList({ onSelectCoin }) {
    const [page, setPage] = useState(1);
    const { data: coins, error, isLoading } = useSWR(
        `coins-${page}`,
        () => fetchCoins(page),
        { refreshInterval: 60000 } // Odświeżaj co minutę
    );

    if (isLoading) return <div>Ładowanie...</div>;
    if (error) return <div>Błąd ładowania danych</div>;

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nazwa</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Cena (USD)</TableHead>
                        <TableHead>Zmiana 24h</TableHead>
                        <TableHead>Działania</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {coins.map((coin) => (
                        <TableRow key={coin.id}>
                            <TableCell>
                                <div className="flex items-center">
                                    <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                                    {coin.name}
                                </div>
                            </TableCell>
                            <TableCell>{coin.symbol.toUpperCase()}</TableCell>
                            <TableCell>${coin.current_price.toFixed(2)}</TableCell>
                            <TableCell className={coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}>
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => onSelectCoin(coin)}>Handluj</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between mt-4">
                <Button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Poprzednia
                </Button>
                <Button onClick={() => setPage(page + 1)}>
                    Następna
                </Button>
            </div>
        </div>
    );
}