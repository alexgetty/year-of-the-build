import { type FC, useState, useEffect } from 'react';
import styles from './SiteHeader.module.css';

export interface SiteHeaderProps {
  /** On homepage, header appears after scrolling past hero */
  showAfterHero?: boolean;
  /** Theme variant */
  variant?: 'dark' | 'light';
}

/**
 * Sticky site header with YOTB logo and navigation.
 *
 * - On homepage: Hidden initially, appears after scrolling past hero
 * - On other pages: Always visible
 */
export const SiteHeader: FC<SiteHeaderProps> = ({
  showAfterHero = false,
  variant = 'dark',
}) => {
  const [visible, setVisible] = useState(!showAfterHero);

  useEffect(() => {
    if (!showAfterHero) return;

    const handleScroll = () => {
      // Show header after scrolling 85% of viewport height (hero is 95vh)
      const threshold = window.innerHeight * 0.85;
      setVisible(window.scrollY > threshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterHero]);

  return (
    <header
      className={styles.header}
      data-visible={visible}
      data-variant={variant}
      role="banner"
    >
      {/* Decorative shapes - same as hero */}
      <div className={styles.shapes} aria-hidden="true">
        <div className={styles.shapeRing} />
        <div className={styles.shapeSquare} />
      </div>

      <div className={styles.container}>
        <a href="/" className={styles.logo} aria-label="YOTB Home">
          YOTB
        </a>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            <li>
              <a href="/devlogs/" className={styles.navLink}>
                Devlogs
              </a>
            </li>
            <li>
              <a href="/projects/" className={styles.navLink}>
                Projects
              </a>
            </li>
            <li>
              <a href="/about/" className={styles.navLink}>
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
