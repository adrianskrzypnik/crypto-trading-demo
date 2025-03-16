import { useState, useEffect } from 'react';
import { fetchCoinHistory } from '@/lib/api';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default function PriceChart({ coinId }) {
    const [timeRange, setTimeRange] = useState(7); // 7 dni domyślnie
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadChartData = async () => {
            try {
                setLoading(true);
                const data = await fetchCoinHistory(coinId, timeRange);

                // Przekształć dane do formatu wymaganego przez Recharts
                const formattedData = data.prices.map(item => ({
                    date: new Date(item[0]),
                    price: item[1]
                }));

                setChartData(formattedData);
                setLoading(false);
            } catch (error) {
                console.error('Błąd podczas pobierania danych historycznych:', error);
                setLoading(false);
            }
        };

        loadChartData();
    }, [coinId, timeRange]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background p-2 border rounded-md shadow-sm">
                    <p className="text-sm">{format(new Date(label), 'dd.MM.yyyy HH:mm')}</p>
                    <p className="text-sm font-semibold">${payload[0].value.toFixed(2)}</p>
                </div>
            );
        }
        return null;
    };

    const timeRangeOptions = [
        { value: 1, label: '24h' },
        { value: 7, label: '7d' },
        { value: 30, label: '30d' },
        { value: 90, label: '90d' },
        { value: 365, label: '1y' },
    ];

    if (loading) {
        return <div>Ładowanie wykresu...</div>;
    }

    return (
        <div>
            <div className="flex space-x-2 mb-4">
                {timeRangeOptions.map(option => (
                    <Button
                        key={option.value}
                        variant={timeRange === option.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTimeRange(option.value)}
                    >
                        {option.label}
                    </Button>
                ))}
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(tick) => format(new Date(tick), timeRange === 1 ? 'HH:mm' : 'dd.MM')}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            tickFormatter={(tick) => `$${tick.toFixed(2)}`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}