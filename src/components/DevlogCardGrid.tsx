/**
 * DevlogCardGrid
 *
 * Animated grid of DevlogCard components.
 * Applies staggered entrance animations.
 */

import { Stagger } from '@gettymade/construct';
import { DevlogCard } from './DevlogCard';
import styles from './CardGrid.module.css';

interface LinkedProject {
  slug: string;
  title: string;
}

interface DevlogData {
  title: string;
  description: string;
  slug: string;
  weekNumber: number;
  pubDate: Date;
  projects?: LinkedProject[];
}

interface DevlogCardGridProps {
  devlogs: DevlogData[];
}

export function DevlogCardGrid({ devlogs }: DevlogCardGridProps) {
  return (
    <Stagger animation="slideUp" className={styles.gridThree}>
      {devlogs.map((devlog) => (
        <DevlogCard
          key={devlog.slug}
          title={devlog.title}
          description={devlog.description}
          slug={devlog.slug}
          weekNumber={devlog.weekNumber}
          pubDate={devlog.pubDate}
          projects={devlog.projects}
        />
      ))}
    </Stagger>
  );
}
