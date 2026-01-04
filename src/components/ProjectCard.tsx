import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  status: 'planning' | 'building' | 'launched' | 'abandoned';
  tags?: string[];
}

export function ProjectCard({ title, description, slug, status, tags }: ProjectCardProps) {
  const statusText = status === 'building' ? 'Building' :
                     status === 'launched' ? 'Live' : 'Planned';

  return (
    <article className={styles.card}>
      <span className={`${styles.status} ${styles[`status-${status}`]}`}>
        {statusText}
      </span>
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
