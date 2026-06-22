import Header from '../../components/Header/Headet';
import StoreProvider from './StoreProvider';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <main className="app-shell">
        <Header />
        {children}
      </main>
    </StoreProvider>
  );
}
