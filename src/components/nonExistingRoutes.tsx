import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '../i18n/navigation';
import pokemon from '../assets/pokemon.svg';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        src={pokemon}
        alt="pokemon"
        width={32}
        height={32}
        style={{
          height: '2rem',
          width: '2rem',
          position: 'absolute',
        }}
      />
      <h1>{t('title')}</h1>
      <p style={{ width: '25rem', textAlign: 'center' }}>{t('message')}</p>
      <Link href="/" className="go-home-button">
        {t('home')}
      </Link>
    </div>
  );
}
