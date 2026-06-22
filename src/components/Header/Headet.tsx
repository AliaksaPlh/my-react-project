import { getTranslations } from 'next-intl/server';
import { Link } from '../../i18n/navigation';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './Header.css';

export default async function Header() {
  const t = await getTranslations('Navigation');

  return (
    <header>
      <nav>
        <ul className="header-panel">
          <li>
            <Link href="/about" className="link">
              {t('about')}
            </Link>
          </li>
          <li>
            <Link href="/not-exist" className="link">
              {t('notExist')}
            </Link>
          </li>
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </nav>
    </header>
  );
}
