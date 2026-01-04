import type { FC } from 'react';
import styles from './SiteFooter.module.css';

interface SiteFooterProps {
  /** Beehiiv publication URL for the subscribe action */
  beehiivUrl?: string;
}

/**
 * Combined newsletter CTA and site footer.
 * Dark section at page bottom with email signup and site info.
 */
export const SiteFooter: FC<SiteFooterProps> = ({
  beehiivUrl = 'https://yotb.beehiiv.com'
}) => {
  return (
    <footer className={styles.footer}>
      {/* Grain overlay */}
      <div className={styles.grain} aria-hidden="true" />

      {/* Background decorations - big blurred shapes */}
      <div className={styles.decorations} aria-hidden="true">
        <div className={styles.shapeRing} />
        <div className={styles.shapeSquare} />
      </div>

      {/* Mid layer - medium shapes */}
      <div className={styles.depthMid} aria-hidden="true">
        <div className={styles.shapeDiamond} />
        <div className={styles.shapeCircle} />
      </div>

      {/* Foreground - small shapes */}
      <div className={styles.depthFg} aria-hidden="true">
        <div className={styles.shapeDot} />
        <div className={styles.shapeDot} />
      </div>

      <div className={styles.container}>
        {/* Newsletter Section */}
        <div className={styles.newsletter}>
          <h3 className={styles.newsletterTitle}>Follow the Build</h3>
          <p className={styles.newsletterDesc}>
            Weekly devlogs delivered to your inbox. No fluff, no spam.
            Just honest updates from the trenches.
          </p>
          <form
            className={styles.form}
            action={beehiivUrl}
            method="get"
            target="_blank"
          >
            <input
              type="email"
              name="email"
              className={styles.input}
              placeholder="you@example.com"
              required
              aria-label="Email address"
            />
            <button type="submit" className={styles.button}>
              Subscribe
            </button>
          </form>
          <p className={styles.hint}>
            Unsubscribe anytime. Your inbox deserves respect.
          </p>
        </div>

        {/* Footer Info */}
        <div className={styles.info}>
          <div className={styles.brand}>YOTB</div>
          <div className={styles.meta}>
            <span>Getty Made LLC</span>
            <span className={styles.separator}>·</span>
            <span>2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
