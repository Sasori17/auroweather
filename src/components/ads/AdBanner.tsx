'use client';

import { useEffect } from 'react';

interface AdBannerProps {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  className?: string;
}

export function AdBanner({
  dataAdSlot,
  dataAdFormat = 'auto',
  dataFullWidthResponsive = true,
  className = '',
}: AdBannerProps) {
  useEffect(() => {
    try {
      // Charger les pubs AdSense
      if (typeof window !== 'undefined') {
        const windowWithAds = window as Window & { adsbygoogle?: unknown[] };
        (windowWithAds.adsbygoogle = windowWithAds.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`ad-banner ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1874448527310505"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      />
    </div>
  );
}

// Bannière horizontale responsive
export function HorizontalAdBanner({ className = '' }: { className?: string }) {
  return (
    <AdBanner
      dataAdSlot="1234567890" // Remplacer par votre slot ID
      dataAdFormat="horizontal"
      dataFullWidthResponsive={true}
      className={className}
    />
  );
}

// Bannière verticale sidebar
export function VerticalAdBanner({ className = '' }: { className?: string }) {
  return (
    <AdBanner
      dataAdSlot="0987654321" // Remplacer par votre slot ID
      dataAdFormat="vertical"
      dataFullWidthResponsive={false}
      className={className}
    />
  );
}

// Bannière carrée
export function SquareAdBanner({ className = '' }: { className?: string }) {
  return (
    <AdBanner
      dataAdSlot="1122334455" // Remplacer par votre slot ID
      dataAdFormat="rectangle"
      dataFullWidthResponsive={false}
      className={className}
    />
  );
}
