import type { AppProps } from 'next/app';
import * as Dialog from '@radix-ui/react-dialog';

import '../styles/globals.css';

import '@fontsource/inter';
import '@fontsource/inter/600.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Dialog.Root>
      <Component {...pageProps} />
    </Dialog.Root>
  );
}

export default MyApp;
