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
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'ca-pub-0000000000000000';

  useEffect(() => {
    try {
      // Load AdSense ads
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
        data-ad-client={publisherId}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      />
    </div>
  );
}

// Horizontal responsive banner
export function HorizontalAdBanner({ className = '' }: { className?: string }) {
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL || '0000000000';

  return (
    <AdBanner
      dataAdSlot={slotId}
      dataAdFormat="horizontal"
      dataFullWidthResponsive={true}
      className={className}
    />
  );
}

// Vertical sidebar banner
export function VerticalAdBanner({ className = '' }: { className?: string }) {
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_VERTICAL || '0000000000';

  return (
    <AdBanner
      dataAdSlot={slotId}
      dataAdFormat="vertical"
      dataFullWidthResponsive={false}
      className={className}
    />
  );
}

// Square banner
export function SquareAdBanner({ className = '' }: { className?: string }) {
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_SQUARE || '0000000000';

  return (
    <AdBanner
      dataAdSlot={slotId}
      dataAdFormat="rectangle"
      dataFullWidthResponsive={false}
      className={className}
    />
  );
}
