import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
      <div className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-bold">Witaj w Crypto Trading Demo</h1>
          <p className="text-xl text-muted-foreground">
            Przetestuj swoje umiejętności tradingowe bez ryzyka. Nasza aplikacja umożliwia symulację handlu kryptowalutami z użyciem wirtualnych środków.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <div className="text-4xl font-bold mb-2">10,000$</div>
              <p className="text-muted-foreground">Wirtualnych środków na start</p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow-sm">
              <div className="text-4xl font-bold mb-2">100+</div>
              <p className="text-muted-foreground">Dostępnych kryptowalut</p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow-sm">
              <div className="text-4xl font-bold mb-2">0%</div>
              <p className="text-muted-foreground">Ryzyka finansowego</p>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/dashboard">
              <Button size="lg">Rozpocznij Trading</Button>
            </Link>
          </div>

          <div className="mt-16 space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Jak to działa?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="space-y-2">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-2 mx-auto md:mx-0">1</div>
                  <h3 className="font-medium">Przeglądaj rynek</h3>
                  <p className="text-muted-foreground">Sprawdzaj aktualne ceny kryptowalut w czasie rzeczywistym, pobierane z API CoinGecko.</p>
                </div>

                <div className="space-y-2">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-2 mx-auto md:mx-0">2</div>
                  <h3 className="font-medium">Kupuj i sprzedawaj</h3>
                  <p className="text-muted-foreground">Wykonuj transakcje kupna i sprzedaży - buduj swój wirtualny portfel inwestycyjny.</p>
                </div>

                <div className="space-y-2">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-2 mx-auto md:mx-0">3</div>
                  <h3 className="font-medium">Śledź wyniki</h3>
                  <p className="text-muted-foreground">Analizuj swoje wyniki i historię transakcji, aby doskonalić strategię inwestycyjną.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Funkcje aplikacji</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Dane rynkowe w czasie rzeczywistym</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Wykresy historyczne cen</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Portfel z śledzeniem wyników</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Historia transakcji</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Symulacja zysków i strat</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Interfejs zbudowany w shadcn/ui</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
}