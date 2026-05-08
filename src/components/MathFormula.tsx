import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathFormulaProps {
  math: string;
  block?: boolean;
}

export const MathFormula: React.FC<MathFormulaProps> = ({ math, block = false }) => {
  const containerRef = useRef<HTMLDivElement | HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(math, containerRef.current, {
        displayMode: block,
        throwOnError: false,
      });
    }
  }, [math, block]);

  if (block) {
    return <div ref={containerRef as React.RefObject<HTMLDivElement>} className="my-4 overflow-x-auto text-center" />;
  }
  return <span ref={containerRef as React.RefObject<HTMLSpanElement>} className="mx-1 inline-block" />;
};
