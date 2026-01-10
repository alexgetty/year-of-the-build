/**
 * DigestTimeline
 *
 * Timeline list of digest cards with staggered entrance animations.
 * Maintains timeline markers while applying motion.
 */

import { Stagger } from './Stagger';
import { DigestCard } from './DigestCard';
import styles from './DevlogTimeline.module.css'; // Reuse same timeline styles

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

interface DigestTimelineProps {
  digests: DigestData[];
}

export function DigestTimeline({ digests }: DigestTimelineProps) {
  return (
    <Stagger animation="slideUp" className={styles.list}>
      {digests.map((digest) => (
        <div key={digest.slug} className={styles.item}>
          <div className={styles.marker} aria-hidden="true" />
          <DigestCard
            title={digest.title}
            description={digest.description}
            slug={digest.slug}
            entryNumber={digest.entryNumber}
            pubDate={digest.pubDate}
            projects={digest.projects}
          />
        </div>
      ))}
    </Stagger>
  );
}
