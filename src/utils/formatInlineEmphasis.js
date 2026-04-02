import React from 'react';

/** Turn `**text**` into <strong> (minimal inline emphasis, not full Markdown). */
export function formatInlineEmphasis(text) {
  if (!text) return null;
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  return segments.map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/);
    if (m) return React.createElement('strong', { key: i }, m[1]);
    return React.createElement(React.Fragment, { key: i }, part);
  });
}
