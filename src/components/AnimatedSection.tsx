
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  id
}) => {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <section 
      id={id} 
      ref={ref} 
      className={`py-20 md:py-32 px-6 transition-all duration-1000 ${
        isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
      } ${className || ''}`}
    >
      <div className="container mx-auto max-w-5xl">
        {children}
      </div>
    </section>
  );
};

export default AnimatedSection;
