import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import usePortfolioStore from '@/store/usePortfolioStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Portfolio() {
    const { funds, assets, transactions, resetPortfolio } = usePortfolioStore();

    const handleResetPortfolio = () => {
        resetPortfolio();
        toast.success('Portfel został zresetowany');
    };

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
                    {Object.keys(assets).length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nazwa</TableHead>
                                    <TableHead>Symbol</TableHead>
                                    <TableHead>Ilość</TableHead>
                                    <TableHead>Wartość</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.values(assets).map((asset) => (
                                    <TableRow key={asset.id}>
                                        <TableCell>{asset.name}</TableCell>
                                        <TableCell>{asset.symbol.toUpperCase()}</TableCell>
                                        <TableCell>{asset.amount?.toFixed(6)}</TableCell>
                                        <TableCell>${(asset.amount * asset.current_price).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
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