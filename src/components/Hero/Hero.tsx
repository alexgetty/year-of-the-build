import type { FC } from 'react';
import styles from './Hero.module.css';

export interface DevlogData {
  title: string;
  slug: string;
  pubDate: Date;
}

interface HeroProps {
  latestDevlog?: DevlogData | null;
}

/**
 * Full-viewport hero section with layered depth background.
 * Static — no scroll animations.
 */
export const Hero: FC<HeroProps> = ({ latestDevlog }) => {
  const formattedDate = latestDevlog?.pubDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <section className={styles.hero}>
      {/* Background layer - blurred, far */}
      <div className={styles.depthBg} aria-hidden="true">
        <div className={styles.shapeRing} />
        <div className={styles.shapeSquare} />
      </div>

      {/* Mid layer - slightly blurred */}
      <div className={styles.depthMid} aria-hidden="true">
        <div className={styles.shapeDiamond} />
        <div className={styles.shapeCircle} />
      </div>

      {/* Foreground layer - sharp */}
      <div className={styles.depthFg} aria-hidden="true">
        <div className={styles.shapeDot} />
        <div className={styles.shapeDot} />
        <div className={styles.shapeDot} />
        <div className={styles.shapeLine} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.word}>Year</span>
          <span className={styles.word}>Of The</span>
          <span className={styles.word}>Build</span>
        </h1>
      </div>

      {/* Bottom bar: latest devlog + nav */}
      <div className={styles.bottomBar}>
        {/* Latest devlog shortcut */}
        {latestDevlog && (
          <div className={styles.latest}>
            <span className={styles.latestLabel}>Latest</span>
            <a href={`/devlogs/${latestDevlog.slug}/`} className={styles.latestLink}>
              <span className={styles.latestTitle}>{latestDevlog.title}</span>
              <span className={styles.latestDate}>{formattedDate}</span>
            </a>
          </div>
        )}

        {/* Nav links */}
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="/devlogs/" className={styles.navLink}>Devlogs</a>
          <a href="/projects/" className={styles.navLink}>Projects</a>
          <a href="/about/" className={styles.navLink}>About</a>
        </nav>
      </div>
    </section>
  );
};

export default Hero;
