import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '../i18n/navigation';
import dogs from '../assets/dogs.svg';

export default async function AboutMe() {
  const t = await getTranslations('About');

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>{t('title')}</h1>
      <h2 style={{ width: '25rem', textAlign: 'center' }}>
        {t('intro')}
        <br />
        {t('github')}{' '}
        <a href="https://github.com/AliaksaPlh">{t('githubLink')}</a>
        <br />
        {t('discord')} <b style={{ color: '#f6bd21' }}>aliaksaplh</b>
      </h2>
      <h3
        style={{
          width: '25rem',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <a href="https://rs.school/courses/reactjs"> {t('courseLink')}</a>
      </h3>
      <Link href="/" className="go-home-button">
        {t('home')}
      </Link>
      <Image
        src={dogs}
        alt="fone"
        width={800}
        height={800}
        style={{
          position: 'absolute',
          top: '0',
          height: '100%',
          width: 'auto',
          zIndex: '-1',
          opacity: '11%',
        }}
      />
    </div>
  );
}
