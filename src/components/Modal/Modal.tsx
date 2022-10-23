import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
  content: string;
  children: ReactNode;
}

const Modal = ({ content, children }: ModalProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 flex items-center justify-center">
        <div className="fixed inset-0 -z-10 bg-gray-900 opacity-60" />
        <Dialog.Content className="bg-gray-700 w-[672px] p-6 rounded-lg">
          <h3 className="text-gray-100 text-lg text-center mb-6">{content}</h3>

          <div className="flex gap-6 max-w-md m-auto">{children}</div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
};

export default Modal;
