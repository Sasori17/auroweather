'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // If no reCAPTCHA key is configured, just render children without reCAPTCHA
  if (!recaptchaSiteKey) {
    console.warn('reCAPTCHA site key not configured. Anti-spam protection disabled.');
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaSiteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
