"use client"

import React from 'react'

interface DropdownMenuProps {
  children: React.ReactNode;
  openDelay?: number; // Optional delay for opening on hover (ms)
  closeDelay?: number; // Optional delay for closing on hover out (ms)
}

interface DropdownMenuTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

interface DropdownMenuContentProps {
  align?: 'start' | 'center' | 'end';
  className?: string;
  children: React.ReactNode;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// Extend context to include timeout management functions
const DropdownMenuContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openDelay: number;
  closeDelay: number;
  startOpenTimer: () => void;
  clearOpenTimer: () => void;
  startCloseTimer: () => void;
  clearCloseTimer: () => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
  openDelay: 0,
  closeDelay: 0,
  startOpenTimer: () => {},
  clearOpenTimer: () => {},
  startCloseTimer: () => {},
  clearCloseTimer: () => {},
});

export function DropdownMenu({ children, openDelay = 150, closeDelay = 150 }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  // Refs to store timeout IDs, allowing us to clear them
  const openTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Function to start the open timer
  const startOpenTimer = React.useCallback(() => {
    clearCloseTimer(); // Always clear close timer if we're trying to open
    if (openTimeoutRef.current) return; // Prevent multiple open timers
    openTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, openDelay);
  }, [openDelay]);

  // Function to clear the open timer
  const clearOpenTimer = React.useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
  }, []);

  // Function to start the close timer
  const startCloseTimer = React.useCallback(() => {
    clearOpenTimer(); // Always clear open timer if we're trying to close
    if (closeTimeoutRef.current) return; // Prevent multiple close timers
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, closeDelay);
  }, [closeDelay]);

  // Function to clear the close timer
  const clearCloseTimer = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const contextValue = React.useMemo(() => ({
    isOpen,
    setIsOpen,
    openDelay,
    closeDelay,
    startOpenTimer,
    clearOpenTimer,
    startCloseTimer,
    clearCloseTimer,
  }), [isOpen, setIsOpen, openDelay, closeDelay, startOpenTimer, clearOpenTimer, startCloseTimer, clearCloseTimer]);

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <div className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ asChild, children }: DropdownMenuTriggerProps) {
  const { isOpen, setIsOpen, startOpenTimer, clearOpenTimer, startCloseTimer, clearCloseTimer } = React.useContext(DropdownMenuContext);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default button behavior
    clearOpenTimer();
    clearCloseTimer();
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    startOpenTimer();
  };

  const handleMouseLeave = () => {
    startCloseTimer();
  };

  const commonProps = {
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    'aria-expanded': isOpen,
    'aria-haspopup': true,
  };

  if (asChild && React.isValidElement(children)) {
    const childElement = children as React.ReactElement<any>;
    return React.cloneElement(childElement, {
      ...commonProps,
      // Merge existing onClick/onMouseEnter/onMouseLeave if present
      onClick: (e: React.MouseEvent) => {
        if (typeof childElement.props.onClick === 'function') {
          childElement.props.onClick(e);
        }
        handleClick(e);
      },
      onMouseEnter: (e: React.MouseEvent) => {
        if (typeof childElement.props.onMouseEnter === 'function') {
          childElement.props.onMouseEnter(e);
        }
        handleMouseEnter();
      },
      onMouseLeave: (e: React.MouseEvent) => {
        if (typeof childElement.props.onMouseLeave === 'function') {
          childElement.props.onMouseLeave(e);
        }
        handleMouseLeave();
      },
    } as any);
  }
  
  return (
    <button
      className="inline-flex items-center justify-center"
      {...commonProps}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({ align = 'start', className = '', children }: DropdownMenuContentProps) {
  const { isOpen, setIsOpen, startCloseTimer, clearCloseTimer } = React.useContext(DropdownMenuContext);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Ensure the click is outside the dropdown trigger and content
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        // Find the trigger element by traversing up from the content ref's parent
        let currentElement: HTMLElement | null = contentRef.current.parentElement;
        let isClickOnTrigger = false;
        while (currentElement) {
          // Check if the clicked element is the trigger itself or its child
          // This assumes the trigger is a direct sibling of the div wrapping the content.
          // A more robust check might involve a ref on the trigger or a common parent.
          if (currentElement.hasAttribute('aria-haspopup')) { // Simple check for trigger
             isClickOnTrigger = currentElement.contains(event.target as Node);
             break;
          }
          currentElement = currentElement.parentElement;
        }

        if (!isClickOnTrigger) {
          setIsOpen(false);
          // Also clear any pending close timers if closed by outside click
          clearCloseTimer();
        }
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, setIsOpen, clearCloseTimer]);

  const handleMouseEnterContent = () => {
    clearCloseTimer(); // Keep the menu open if mouse re-enters content
  };

  const handleMouseLeaveContent = () => {
    startCloseTimer(); // Start timer to close when leaving content
  };

  if (!isOpen) return null;

  const alignmentClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2', // Use -translate-x-1/2 for transform
    end: 'right-0'
  };

  return (
    <div
      ref={contentRef}
      onMouseEnter={handleMouseEnterContent}
      onMouseLeave={handleMouseLeaveContent}
      className={`absolute top-full mt-1 ${alignmentClasses[align]} z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, className = '', onClick }: DropdownMenuItemProps) {
  const { setIsOpen, clearOpenTimer, clearCloseTimer } = React.useContext(DropdownMenuContext);

  const handleClick = (e: React.MouseEvent) => {
    onClick?.();
    setIsOpen(false);
    clearOpenTimer(); // Clear any pending open timer
    clearCloseTimer(); // Clear any pending close timer
  };

  return (
    <div
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 ${className}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}