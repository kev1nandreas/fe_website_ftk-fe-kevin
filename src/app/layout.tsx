import type { Metadata } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';

const playFair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--playfair-display',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--poppins',
});

export const metadata: Metadata = {
  title: 'BEM FTK ITS - Bentang Layar',
  description: 'BEM FTK ITS Website',
  icons: {
    icon: '/icons/FTKIcon.png', // Path to your icon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head></head>
      <body className={`${playFair.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
