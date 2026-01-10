/**
 * DigestCardGrid
 *
 * Animated grid of DigestCard components.
 * Applies staggered entrance animations.
 */

import { Stagger } from './Stagger';
import { DigestCard } from './DigestCard';
import styles from './CardGrid.module.css';

interface LinkedProject {
  slug: string;
  title: string;
}

interface DigestData {
  title: string;
  description: string;
  slug: string;
  entryNumber: number;
  pubDate: Date;
  projects?: LinkedProject[];
}

interface DigestCardGridProps {
  digests: DigestData[];
}

export function DigestCardGrid({ digests }: DigestCardGridProps) {
  return (
    <Stagger animation="slideUp" className={styles.gridThree}>
      {digests.map((digest) => (
        <DigestCard
          key={digest.slug}
          title={digest.title}
          description={digest.description}
          slug={digest.slug}
          entryNumber={digest.entryNumber}
          pubDate={digest.pubDate}
          projects={digest.projects}
        />
      ))}
    </Stagger>
  );
}
