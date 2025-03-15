// components/CodeHighlighter.jsx
'use client';

import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';

export default function CodeHighlighter({ children }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  return children;
}