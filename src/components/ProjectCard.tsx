import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  status: 'planning' | 'building' | 'launched' | 'abandoned' | 'stale';
  tags?: string[];
  lastUpdated?: string;
}

function formatLastUpdated(dateString?: string): string | null {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export function ProjectCard({ title, description, slug, status, tags, lastUpdated }: ProjectCardProps) {
  const statusText = status === 'building' ? 'Building' :
                     status === 'launched' ? 'Live' :
                     status === 'stale' ? 'Stale' : 'Planning';
  const updatedLabel = formatLastUpdated(lastUpdated);

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <span className={`${styles.status} ${styles[`status-${status}`]}`}>
          {statusText}
        </span>
        {updatedLabel && (
          <span className={styles.updated}>{updatedLabel}</span>
        )}
      </div>
      <h3 className={styles.title}>
        <a href={`/projects/${slug}/`} className={styles.cardLink}>{title}</a>
      </h3>
      <p className={styles.description}>{description}</p>
      {tags && tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      )}
    </article>
  );
}
