import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { TenantProvider } from './context/Tentant';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router';

const app = () => {
  const currentUrl = window.location.href;
  const pathname = currentUrl.split('/')[3]
  return (
  <React.StrictMode>
    <TenantProvider>
        <HelmetProvider>
          <Helmet>
            <title>{pathname}</title>
            <link rel="canonical" href="https://www.localhost.com/" />

            <meta name="color-scheme" content="light dark" />
            <meta
              name="viewport"
              content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
            <meta name="format-detection" content="telephone=no" />
            <meta name="msapplication-tap-highlight" content="no" />

            <link rel="manifest" href={`tenant/${pathname}/config/manifest.json`} />

            <link rel="shortcut icon" type="image/png" href={`tenant/${pathname}/assets/favicon.png`} />

            {/* <!-- add to homescreen for ios --> */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-title" content="Ionic App" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          </Helmet>
          <App tenantName={pathname} />
        </HelmetProvider>
    </TenantProvider>
  </React.StrictMode>
  )
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  app()
);