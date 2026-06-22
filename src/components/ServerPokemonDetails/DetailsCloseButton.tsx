'use client';

import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '../../i18n/navigation';
import Button from '../Button/Button';
import { useTranslations } from 'next-intl';

export default function DetailsCloseButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('PokemonDetails');

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('selected');
    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <Button onClick={handleClose} className="close-button secondary">
      {t('close')}
    </Button>
  );
}
