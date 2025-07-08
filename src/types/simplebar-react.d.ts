declare module 'simplebar-react' {
  import { Component } from 'react';
  
  interface SimpleBarProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    autoHide?: boolean;
    forceVisible?: boolean | 'x' | 'y';
    clickOnTrack?: boolean;
    scrollbarMinSize?: number;
    scrollbarMaxSize?: number;
    direction?: 'rtl' | 'ltr';
    timeout?: number;
    [key: string]: any;
  }
  
  export default class SimpleBar extends Component<SimpleBarProps> {}
}
