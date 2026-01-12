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


      <div className={styles.container}>
        {/* Newsletter Section */}
        <div className={styles.newsletter}>
          <div className={styles.newsletterText}>
            <h3 className={styles.newsletterTitle}>Follow the Build</h3>
            <p className={styles.newsletterDesc}>
              Weekly digests delivered to your inbox every Sunday. Unsubscribe anytime.
            </p>
          </div>
          <a
            href={beehiivUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Subscribe to the Newsletter
          </a>
        </div>

        {/* Footer Info */}
        <div className={styles.info}>
          <div className={styles.brand}>YOTB</div>
          <div className={styles.meta}><a href="https://alexgetty.co" target="_blank">Alex Getty</a> 2026</div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
