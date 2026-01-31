import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script>
          {`(function(){
            try {
              var h = document.documentElement;
              h.removeAttribute('data-bybit-channel-name');
              h.removeAttribute('data-bybit-is-default-wallet');
            } catch(e){}
          })();`}
        </script>
      </head>
      <body>{children}</body>
    </html>
  );
}
