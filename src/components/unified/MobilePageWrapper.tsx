import React, { useRef, useEffect } from 'react';

interface MobilePageWrapperProps {
  children: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Padding inside the page; default 16px sides */
  noPadding?: boolean;
  /** If true, disables scroll (used for full-screen sub-views) */
  noScroll?: boolean;
  /** Pull-to-refresh mock callback */
  onRefresh?: () => void;
}

export function MobilePageWrapper({
  children,
  className = '',
  noPadding = false,
  noScroll = false,
  onRefresh,
}: MobilePageWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`mobile-content screen-enter ${noScroll ? 'overflow-hidden' : 'overflow-y-auto'} ${className}`}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className={noPadding ? '' : 'px-4'}>
        {children}
      </div>
    </div>
  );
}
