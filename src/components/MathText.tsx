import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export function MathText({ text }: { text: string | React.ReactNode }) {
  if (typeof text !== 'string') return <>{text}</>;

  // Split by $$...$$ first, then $...$
  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          return <BlockMath key={i} math={part.slice(2, -2)} />;
        } else if (part.startsWith('$') && part.endsWith('$')) {
          return <InlineMath key={i} math={part.slice(1, -1)} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
