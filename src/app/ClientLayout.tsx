import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import QueryProvider from './QueryProvider';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <Toaster position='bottom-center' />
      {children}
    </QueryProvider>
  );
}
