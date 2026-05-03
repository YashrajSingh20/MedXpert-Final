import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
  as?: 'div' | 'button';
}

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'rgba(20, 184, 166, 0.12)',
  onClick,
  as = 'div',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Component = as === 'button' ? motion.button : motion.div;

  return (
    <Component
      ref={cardRef as any}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ 
        scale: 1.03, 
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } 
      }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      <div
        className="absolute pointer-events-none transition-opacity duration-300 rounded-full"
        style={{
          width: '300px',
          height: '300px',
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, rgba(20,184,166,0.15), transparent, rgba(139,92,246,0.15))`,
          opacity: isHovered ? 1 : 0,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <div className="relative z-10">{children}</div>
    </Component>
  );
};

export default GlowCard;
