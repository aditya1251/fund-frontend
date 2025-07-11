declare module 'react-syntax-highlighter/dist/esm/styles/hljs' {
  const docco: any;
  export { docco };
  export default any;
}

declare module 'react-syntax-highlighter' {
  import { Component } from 'react';
  
  interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    children?: string;
    customStyle?: React.CSSProperties;
    codeTagProps?: any;
    useInlineStyles?: boolean;
    showLineNumbers?: boolean;
    startingLineNumber?: number;
    lineNumberStyle?: any;
    wrapLines?: boolean;
    wrapLongLines?: boolean;
    lineProps?: any;
    renderer?: any;
    PreTag?: any;
    CodeTag?: any;
    [key: string]: any;
  }
  
  export default class SyntaxHighlighter extends Component<SyntaxHighlighterProps> {}
}
