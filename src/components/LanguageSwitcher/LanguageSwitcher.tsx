'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '../../i18n/navigation';
import Button from '../Button/Button';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Navigation');
  const nextLocale = locale === 'en' ? 'ru' : 'en';

  return (
    <Button
      className="secondary"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
    >
      {t('language')}
    </Button>
  );
}
