import NotFound from '../components/nonExistingRoutes';
import MainLayout from './(main)/MainLayout';

export default function NotFoundPage() {
  return (
    <MainLayout>
      <NotFound />
    </MainLayout>
  );
}
