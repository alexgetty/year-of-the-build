import styles from './PageHeader.module.css';

interface PageHeaderProps {
  title: string;
  description?: string;
  cta?: string;
  ctaHref?: string;
}

export function PageHeader({ title, description, cta, ctaHref }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
          {cta && ctaHref && (
            <a href={ctaHref} className={styles.cta}>{cta}</a>
          )}
        </div>
      </div>
    </header>
  );
}
