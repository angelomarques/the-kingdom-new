import type { AppProps } from 'next/app';
import * as Dialog from '@radix-ui/react-dialog';

import '../styles/globals.css';

import '@fontsource/inter';
import '@fontsource/inter/600.css';
import { AuthProvider } from '../contexts/AuthContext';
import initAuth from '../services/auth';

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Dialog.Root>
        <Component {...pageProps} />
      </Dialog.Root>
    </AuthProvider>
  );
}

export default MyApp;
