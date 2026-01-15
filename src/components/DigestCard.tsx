import styles from './DigestCard.module.css';

interface DigestCardProps {
  title: string;
  description: string;
  slug: string;
  entryNumber: number;
  pubDate: Date;
  projects?: { slug: string; title: string }[];
}

export function DigestCard({
  title,
  description,
  slug,
  entryNumber,
  pubDate,
  projects,
}: DigestCardProps) {
  const formattedDate = pubDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <article className={styles.card}>
      <span className={styles.badge}>Weekly Digest</span>
      <h3 className={styles.title}>
        <a href={`/digests/${slug}/`} className={styles.cardLink}>{title}</a>
      </h3>
      <p className={styles.excerpt}>{description}</p>
      <div className={styles.footer}>
        <time className={styles.date} dateTime={pubDate.toISOString()}>
          {formattedDate}
        </time>
        {projects && projects.length > 0 && (
          <div className={styles.projects}>
            {projects.map((project) => (
              <span key={project.slug} className={styles.project}>
                {project.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
