/**
 * ProjectCardGrid
 *
 * Animated grid of ProjectCard components.
 * Applies staggered entrance animations.
 */

import { Stagger } from '@gettymade/construct';
import { ProjectCard } from './ProjectCard';
import styles from './CardGrid.module.css';

interface ProjectData {
  title: string;
  description: string;
  slug: string;
  status: 'planning' | 'building' | 'launched' | 'abandoned';
  tags?: string[];
}

interface ProjectCardGridProps {
  projects: ProjectData[];
  /** Use 4-column layout (default 3) */
  columns?: 3 | 4;
}

export function ProjectCardGrid({ projects, columns = 3 }: ProjectCardGridProps) {
  const gridClass = columns === 4 ? styles.gridFour : styles.gridThree;

  return (
    <Stagger animation="slideUp" className={gridClass}>
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          title={project.title}
          description={project.description}
          slug={project.slug}
          status={project.status}
          tags={project.tags}
        />
      ))}
    </Stagger>
  );
}
