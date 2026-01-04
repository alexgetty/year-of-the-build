/**
 * DevlogTimeline
 *
 * Timeline list of devlog cards with staggered entrance animations.
 * Maintains timeline markers while applying motion.
 */

// TODO: Uncomment when @gettymade/construct is published to npm
// import { Stagger } from '@gettymade/construct';
import { Stagger } from './Stagger';
import { DevlogCard } from './DevlogCard';
import styles from './DevlogTimeline.module.css';

interface LinkedProject {
  slug: string;
  title: string;
}

interface DevlogData {
  title: string;
  description: string;
  slug: string;
  entryNumber: number;
  pubDate: Date;
  projects?: LinkedProject[];
  commitCount?: number;
}

interface DevlogTimelineProps {
  devlogs: DevlogData[];
}

export function DevlogTimeline({ devlogs }: DevlogTimelineProps) {
  return (
    <Stagger animation="slideUp" className={styles.list}>
      {devlogs.map((devlog) => (
        <div key={devlog.slug} className={styles.item}>
          <div className={styles.marker} aria-hidden="true" />
          <DevlogCard
            title={devlog.title}
            description={devlog.description}
            slug={devlog.slug}
            entryNumber={devlog.entryNumber}
            pubDate={devlog.pubDate}
            projects={devlog.projects}
            commitCount={devlog.commitCount}
          />
        </div>
      ))}
    </Stagger>
  );
}
