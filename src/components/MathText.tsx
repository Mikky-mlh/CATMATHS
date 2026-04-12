import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

function fixLatex(latex: string): string {
  let fixed = latex;
  
  // Only add backslash if not already present
  fixed = fixed.replace(/([^\\])\b(frac|sqrt|sin|cos|tan|pi|theta|alpha|beta|gamma|delta|cdot|times)\b/g, '$1\\$2');
  fixed = fixed.replace(/^(frac|sqrt|sin|cos|tan|pi|theta|alpha|beta|gamma|delta|cdot|times)\b/g, '\\$1');
  
  return fixed;
}

export function MathText({ text }: { text: string | React.ReactNode }) {
  if (typeof text !== 'string') return <>{text}</>;

  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = fixLatex(part.slice(2, -2));
          return <BlockMath key={i} math={math} />;
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const math = fixLatex(part.slice(1, -1));
          return <InlineMath key={i} math={math} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
