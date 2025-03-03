
import { useState, useEffect, useRef } from "react";

interface StatNumberProps {
  value: string;
  label: string;
}

const StatNumber = ({ value, label }: StatNumberProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [targetValue] = useState(parseInt(value.replace(/,/g, "")));
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        const timer = setTimeout(() => {
          const steps = 50;
          const increment = targetValue / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
              setCount(targetValue);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, 20);
          return () => clearInterval(interval);
        }, 400);
        return () => clearTimeout(timer);
      }
    }, {
      threshold: 0.1
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [targetValue]);
  
  return (
    <div className="text-center" ref={ref}>
      <div className="text-4xl font-bold mb-2 text-gradient">
        {count.toLocaleString('en-US')}+
      </div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
};

export default StatNumber;
