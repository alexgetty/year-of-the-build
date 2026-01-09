import { useEffect, useRef, useState, type FC } from 'react';
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
 * Full-viewport hero section with layered parallax background.
 * Layers move at different speeds based on scroll position.
 * - Background (big, blurry): slowest
 * - Mid (medium): medium speed
 * - Foreground (small, sharp): fastest
 */
export const Hero: FC<HeroProps> = ({ latestDevlog }) => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Only track scroll while hero is in view
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formattedDate = latestDevlog?.pubDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

  // Parallax multipliers - smaller = slower movement
  const bgOffset = scrollY * 0.08;   // Slowest - big blurry shapes
  const midOffset = scrollY * 0.2;   // Medium
  const fgOffset = scrollY * 0.35;   // Fastest - small sharp shapes

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Grain overlay */}
      <div className={styles.grain} aria-hidden="true" />

      {/* Background layer - big blurred shapes - SLOWEST */}
      <div
        className={styles.depthBg}
        aria-hidden="true"
        style={{ transform: `translateY(${bgOffset}px)` }}
      >
        <div className={styles.shapeRing} />
        <div className={styles.shapeSquare} />
      </div>

      {/* Mid layer - medium shapes - MEDIUM */}
      <div
        className={styles.depthMid}
        aria-hidden="true"
        style={{ transform: `translateY(${midOffset}px)` }}
      >
        <div className={styles.shapeDiamond} />
        <div className={styles.shapeCircle} />
      </div>

      {/* Foreground layer - small sharp shapes - FASTEST */}
      <div
        className={styles.depthFg}
        aria-hidden="true"
        style={{ transform: `translateY(${fgOffset}px)` }}
      >
        <div className={styles.shapeDot} />
        <div className={styles.shapeDot} />
        <div className={styles.shapeDot} />
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
