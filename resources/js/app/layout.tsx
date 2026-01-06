import RocketScripts from '@/components/common/RocketScripts';
import { ReactNode } from 'react';
import '../../css/tailwind.css';

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata = {
    title: 'UpWearLane',
    description:
        'UpWearLane - High-end premium clothing brand.',
    icons: {
        icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                {children}
                <RocketScripts />
            </body>
        </html>
    );
}
