/**
 * Figure
 *
 * Image component for MDX devlogs with optional sidebar placement.
 * Supports inline rendering or portal to sidebar gallery.
 * Click triggers lightbox:open custom event.
 */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Figure.module.css';

interface FigureProps {
  /** Image source path */
  src: string;
  /** Accessibility text */
  alt: string;
  /** Optional caption displayed below image */
  caption?: string;
  /** Placement: inline in content or portal to sidebar */
  placement?: 'inline' | 'sidebar';
}

export function Figure({
  src,
  alt,
  caption,
  placement = 'inline',
}: FigureProps) {
  const [sidebarContainer, setSidebarContainer] = useState<HTMLElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (placement === 'sidebar') {
      const container = document.getElementById('sidebar-figures');
      setSidebarContainer(container);
    }
  }, [placement]);

  const handleClick = () => {
    const event = new CustomEvent('lightbox:open', {
      detail: { src, alt, caption },
    });
    window.dispatchEvent(event);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const figureContent = (
    <figure className={styles.figure}>
      <div
        className={styles.imageWrapper}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`View ${alt} in lightbox`}
      >
        <img
          src={src}
          alt={alt}
          className={styles.image}
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className={styles.caption}>{caption}</figcaption>
      )}
    </figure>
  );

  // Sidebar placement: portal if container exists, otherwise fall back to inline
  if (placement === 'sidebar') {
    // Before hydration or if no sidebar container (mobile), render inline
    if (!isMounted || !sidebarContainer) {
      return figureContent;
    }
    // Hydrated with sidebar available: portal to sidebar
    // Leave a hidden anchor for scroll-sync (Phase 2)
    return (
      <>
        <span data-figure-anchor={src} style={{ display: 'none' }} />
        {createPortal(figureContent, sidebarContainer)}
      </>
    );
  }

  return figureContent;
}
