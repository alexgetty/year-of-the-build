import styles from './DevlogCard.module.css';

interface LinkedProject {
  slug: string;
  title: string;
}

interface DevlogCardProps {
  title: string;
  description: string;
  slug: string;
  entryNumber: number;
  pubDate: Date;
  projects?: LinkedProject[];
}

export function DevlogCard({
  title,
  description,
  slug,
  entryNumber,
  pubDate,
  projects,
}: DevlogCardProps) {
  const formattedDate = pubDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <article className={styles.card}>
      <span className={styles.number}>{String(entryNumber).padStart(2, '0')}</span>
      <h3 className={styles.title}>
        <a href={`/devlogs/${slug}/`} className={styles.cardLink}>{title}</a>
      </h3>
      <p className={styles.excerpt}>{description}</p>
      <div className={styles.footer}>
        <time className={styles.date} dateTime={pubDate.toISOString()}>
          {formattedDate}
        </time>
        <div className={styles.footerRight}>
          {projects && projects.length > 0 && (
            <span className={styles.project}>
              {projects.map(p => p.title).join(', ')}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
