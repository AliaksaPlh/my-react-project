import { setRequestLocale } from 'next-intl/server';
import MainLayout from '../../(main)/MainLayout';
import AboutMe from '../../../components/AboutMe';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <MainLayout>
      <AboutMe />
    </MainLayout>
  );
}
