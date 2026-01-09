import styles from './DevlogCard.module.css';

interface DigestCardProps {
  title: string;
  description: string;
  slug: string;
  weekOf: Date;
}

export function DigestCard({
  title,
  description,
  slug,
  weekOf,
}: DigestCardProps) {
  const formattedWeek = weekOf.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <article className={styles.card}>
      <span className={styles.number}>W</span>
      <h3 className={styles.title}>
        <a href={`/digests/${slug}/`} className={styles.cardLink}>{title}</a>
      </h3>
      <p className={styles.excerpt}>{description}</p>
      <div className={styles.footer}>
        <time className={styles.date} dateTime={weekOf.toISOString()}>
          Week of {formattedWeek}
        </time>
        <div className={styles.footerRight}>
          <span className={styles.project}>Weekly Digest</span>
        </div>
      </div>
    </article>
  );
}
