import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import * as Dialog from '@radix-ui/react-dialog';

export function renderWithModal(component: ReactNode) {
  return render(<Dialog.Root>{component}</Dialog.Root>);
}
