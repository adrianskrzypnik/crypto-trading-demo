'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Strona główna' },
        { href: '/dashboard', label: 'Dashboard' },
    ];

    return (
        <html lang="pl">
        <body className="min-h-screen flex flex-col">
        <header className="border-b">
            <div className="container mx-auto py-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                    Crypto Trading Demo
                </Link>
                <nav>
                    <ul className="flex space-x-4">
                        {navItems.map(item => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`px-2 py-1 rounded-md ${
                                        pathname === item.href
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-muted'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>

        <main className="flex-1 bg-muted/30">{children}</main>

        <footer className="border-t py-4">
            <div className="container mx-auto text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Crypto Trading Demo | Dane dostarczane przez CoinGecko
            </div>
        </footer>

        <Toaster />
        </body>
        </html>
    );
}
