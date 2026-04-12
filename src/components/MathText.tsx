import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

function fixLatex(latex: string): string {
  return latex
    .replace(/([^\\])frac\{/g, '$1\\frac{')
    .replace(/^frac\{/g, '\\frac{')
    .replace(/([^\\])sqrt\{/g, '$1\\sqrt{')
    .replace(/^sqrt\{/g, '\\sqrt{')
    .replace(/([^\\])pi([^a-z]|$)/g, '$1\\pi$2')
    .replace(/^pi([^a-z]|$)/g, '\\pi$1')
    .replace(/([^\\])theta([^a-z]|$)/g, '$1\\theta$2')
    .replace(/^theta([^a-z]|$)/g, '\\theta$1')
    .replace(/([^\\])alpha([^a-z]|$)/g, '$1\\alpha$2')
    .replace(/^alpha([^a-z]|$)/g, '\\alpha$1')
    .replace(/([^\\])beta([^a-z]|$)/g, '$1\\beta$2')
    .replace(/^beta([^a-z]|$)/g, '\\beta$1');
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
