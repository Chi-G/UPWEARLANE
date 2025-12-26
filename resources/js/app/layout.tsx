import { ReactNode } from 'react';
import '../../css/tailwind.css';
import RocketScripts from '@/components/common/RocketScripts';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Laravel with Tailwind CSS',
  description: 'A boilerplate project with Laravel 12 and Tailwind CSS 3.4.17',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
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
