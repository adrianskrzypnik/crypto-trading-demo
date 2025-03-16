import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import usePortfolioStore from '@/store/usePortfolioStore'; // Dodaj import hooka

export default function TradingForm({ coin, onTrade }) {
    const [amount, setAmount] = useState('');
    const [action, setAction] = useState('buy');

    // Pobierz stan portfela
    const { assets } = usePortfolioStore();

    // Pobierz ilość posiadanej kryptowaluty
    const ownedAmount = assets[coin.id]?.amount || 0;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            toast.error("Błąd: Proszę wprowadzić poprawną ilość");
            return;
        }

        // Sprawdź, czy użytkownik ma wystarczającą ilość kryptowaluty do sprzedaży
        if (action === 'sell' && parseFloat(amount) > ownedAmount) {
            toast.error(`Błąd: Posiadasz tylko ${ownedAmount.toFixed(6)} ${coin.symbol.toUpperCase()}`);
            return;
        }

        const tradeDetails = {
            coin,
            amount: parseFloat(amount),
            action,
            price: coin.current_price,
            timestamp: new Date(),
            total: action === 'buy'
                ? parseFloat(amount) * coin.current_price
                : parseFloat(amount),
        };

        onTrade(tradeDetails);
        setAmount('');

        toast.success(`${action === 'buy' ? 'Zakupiono' : 'Sprzedano'} ${amount} ${coin.symbol.toUpperCase()}`);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Handluj {coin.name} ({coin.symbol.toUpperCase()})
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm mb-1">Aktualna cena: ${coin.current_price}</p>
                        </div>
                        <div className="flex space-x-2">
                            <Button
                                type="button"
                                variant={action === 'buy' ? 'default' : 'outline'}
                                onClick={() => setAction('buy')}
                                className="flex-1"
                            >
                                Kup
                            </Button>
                            <Button
                                type="button"
                                variant={action === 'sell' ? 'default' : 'outline'}
                                onClick={() => setAction('sell')}
                                className="flex-1"
                            >
                                Sprzedaj
                            </Button>
                        </div>
                        <div>
                            <Input
                                type="number"
                                placeholder={`Ilość ${coin.symbol.toUpperCase()}`}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                min="0"
                                step="0.000001"
                            />
                        </div>
                        {action === 'sell' && (
                            <div className="text-sm text-gray-500">
                                Posiadasz: {ownedAmount.toFixed(6)} {coin.symbol.toUpperCase()}
                            </div>
                        )}
                        {amount && (
                            <div className="text-sm">
                                {action === 'buy' ? 'Koszt' : 'Otrzymasz'}: ${(parseFloat(amount || 0) * coin.current_price).toFixed(2)}
                            </div>
                        )}
                        <Button type="submit" className="w-full">
                            {action === 'buy' ? 'Kup' : 'Sprzedaj'} {coin.symbol.toUpperCase()}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}