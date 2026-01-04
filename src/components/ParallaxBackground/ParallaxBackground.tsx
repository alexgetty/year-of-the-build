import { useScroll, useTransform, motion } from 'framer-motion';
import type { FC, CSSProperties } from 'react';
import styles from './ParallaxBackground.module.css';

export type ShapeType = 'ring' | 'square' | 'diamond' | 'circle' | 'dot';
export type DepthTier = 'far' | 'mid' | 'near';

export interface ShapeConfig {
  type: ShapeType;
  depth: DepthTier;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

interface ParallaxBackgroundProps {
  shapes?: ShapeConfig[];
}

/** Default shape configuration - large blurry shapes for light content area */
const defaultShapes: ShapeConfig[] = [
  // Far layer only - big blurred shapes visible on light background
  { type: 'ring', depth: 'far', position: { top: '60vh', right: '-8%' } },
  { type: 'square', depth: 'far', position: { top: '120vh', left: '-5%' } },
  { type: 'ring', depth: 'far', position: { top: '200vh', left: '60%' } },
];

const shapeClassMap: Record<ShapeType, string> = {
  ring: styles.shapeRing,
  square: styles.shapeSquare,
  diamond: styles.shapeDiamond,
  circle: styles.shapeCircle,
  dot: styles.shapeDot,
};

/**
 * Global parallax background layer.
 * Shapes move at different speeds based on depth tier.
 * Uses mix-blend-mode to adapt colors across dark/light zones.
 */
export const ParallaxBackground: FC<ParallaxBackgroundProps> = ({
  shapes = defaultShapes,
}) => {
  const { scrollY } = useScroll();

  // Parallax: Far layer moves slowly (0.1x scroll speed)
  const farY = useTransform(scrollY, [0, 3000], [0, 300]);

  // Only far shapes in global layer
  const farShapes = shapes.filter((s) => s.depth === 'far');

  const renderShape = (shape: ShapeConfig, index: number) => {
    const positionStyle: CSSProperties = {
      ...shape.position,
    };

    return (
      <div
        key={`${shape.type}-${shape.depth}-${index}`}
        className={`${styles.shape} ${shapeClassMap[shape.type]}`}
        style={positionStyle}
      />
    );
  };

  return (
    <div className={styles.background} aria-hidden="true">
      {/* Grain overlay */}
      <div className={styles.grain} />

      {/* Far layer - large blurry shapes with slow parallax (0.1x) */}
      <motion.div className={styles.depthFar} style={{ y: farY }}>
        {farShapes.map(renderShape)}
      </motion.div>
    </div>
  );
};

export default ParallaxBackground;
