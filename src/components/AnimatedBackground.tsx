import React from 'react';

const orbs = [
  { className: 'w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-med-500/10 top-[-10%] left-[-5%]', animation: 'animate-orb-drift-1' },
  { className: 'w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-sky-400/10 bottom-[-5%] right-[-5%]', animation: 'animate-orb-drift-2' },
  { className: 'w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-accent-500/5 top-[40%] right-[20%]', animation: 'animate-orb-drift-3' },
];

interface AnimatedBackgroundProps {
  variant?: 'full' | 'subtle';
  children?: React.ReactNode;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'full', children }) => {
  return (
    <div className="relative overflow-hidden">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-[100px] md:blur-[140px] pointer-events-none ${orb.className} ${orb.animation}`}
          style={{ opacity: variant === 'subtle' ? 0.4 : 0.7 }}
        />
      ))}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;
