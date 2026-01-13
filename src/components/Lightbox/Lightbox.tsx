/**
 * Lightbox
 *
 * Full-screen image overlay triggered by lightbox:open custom event.
 * Uses Framer Motion for enter/exit animations.
 * Supports prev/next navigation via buttons and arrow keys.
 */

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import styles from './Lightbox.module.css';

interface LightboxData {
  src: string;
  alt: string;
  caption?: string;
}

export function Lightbox() {
  const [data, setData] = useState<LightboxData | null>(null);
  const [allImages, setAllImages] = useState<LightboxData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Collect all lightbox images from the page
  useEffect(() => {
    const collectImages = () => {
      const triggers = document.querySelectorAll('[data-lightbox-trigger], [data-figure-anchor]');
      const images: LightboxData[] = [];

      triggers.forEach((el) => {
        const src = el.getAttribute('data-src') || el.getAttribute('data-figure-anchor');
        const alt = el.getAttribute('data-alt') || '';
        const caption = el.getAttribute('data-caption') || undefined;
        if (src) {
          // Avoid duplicates
          if (!images.some(img => img.src === src)) {
            images.push({ src, alt, caption });
          }
        }
      });

      // Also collect from Figure components (they dispatch with src in detail)
      setAllImages(images);
    };

    collectImages();
    // Re-collect when DOM changes (for dynamic content)
    const observer = new MutationObserver(collectImages);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => {
    setData(null);
    if (previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  }, []);

  const goToNext = useCallback(() => {
    if (allImages.length <= 1) return;
    const nextIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(nextIndex);
    setData(allImages[nextIndex]);
  }, [allImages, currentIndex]);

  const goToPrev = useCallback(() => {
    if (allImages.length <= 1) return;
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(prevIndex);
    setData(allImages[prevIndex]);
  }, [allImages, currentIndex]);

  useEffect(() => {
    const handleOpen = (e: CustomEvent<LightboxData>) => {
      previousActiveElement.current = document.activeElement as HTMLElement;
      const openedData = e.detail;
      setData(openedData);

      // Find index of opened image in collection
      const index = allImages.findIndex(img => img.src === openedData.src);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!data) return;

      switch (e.key) {
        case 'Escape':
          close();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrev();
          break;
      }
    };

    window.addEventListener('lightbox:open', handleOpen as EventListener);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('lightbox:open', handleOpen as EventListener);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [data, close, goToNext, goToPrev, allImages]);

  // Focus close button when lightbox opens
  useEffect(() => {
    if (data && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [data]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (data) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [data]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const imageVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      };

  const hasMultipleImages = allImages.length > 1;

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          className={styles.overlay}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.2 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox: ${data.alt}`}
        >
          <motion.button
            ref={closeButtonRef}
            className={styles.closeButton}
            onClick={close}
            aria-label="Close lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </motion.button>

          {hasMultipleImages && (
            <>
              <motion.button
                className={`${styles.navButton} ${styles.navPrev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                aria-label="Previous image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </motion.button>

              <motion.button
                className={`${styles.navButton} ${styles.navNext}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Next image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </motion.button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.figure
              key={data.src}
              className={styles.content}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{
                duration: prefersReducedMotion ? 0.1 : 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={data.src}
                alt={data.alt}
                className={styles.image}
              />
              {(data.caption || hasMultipleImages) && (
                <figcaption className={styles.caption}>
                  {data.caption}
                  {hasMultipleImages && (
                    <span className={styles.counter}>
                      {currentIndex + 1} / {allImages.length}
                    </span>
                  )}
                </figcaption>
              )}
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
