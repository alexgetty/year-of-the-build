import styles from './DevlogCard.module.css';

interface DigestCardProps {
  title: string;
  description: string;
  slug: string;
  pubDate: Date;
}

export function DigestCard({
  title,
  description,
  slug,
  pubDate,
}: DigestCardProps) {
  const formattedDate = pubDate.toLocaleDateString('en-US', {
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
        <time className={styles.date} dateTime={pubDate.toISOString()}>
          {formattedDate}
        </time>
        <div className={styles.footerRight}>
          <span className={styles.project}>Weekly Digest</span>
        </div>
      </div>
    </article>
  );
}
