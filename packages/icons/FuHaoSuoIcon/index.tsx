import React from 'react';
import type { IconContainerProps } from '../IconContainer';
import { IconContainer } from '../IconContainer';

export function FuHaoSuoIcon(props: IconContainerProps) {
  return (
    <IconContainer viewBox="0 0 1024 1024" {...props}>
      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#7F68DA"></path>
      <path
        d="M512 168c104.448 0 189.344 83.296 191.936 187.12L704 360v96h64c17.6 0 32 14.4 32 32v304c0 17.6-14.4 32-32 32H256c-17.68 0-32-14.4-32-32v-304c0-17.6 14.32-32 32-32h64v-96c0-104.448 83.296-189.344 187.12-191.936L512 168z m8 368c-39.84 0-72 32.16-72 72 0 25.024 12.688 47.04 32 59.92V704l0.08 2.624A40.016 40.016 0 0 0 560 704v-36.096c19.312-12.896 32-34.88 32-59.904 0-39.84-32.16-72-72-72z m-8-304a127.968 127.968 0 0 0-127.936 124L384 360v96h256v-96a127.968 127.968 0 0 0-124-127.936L512 232z"
        fill="#FFFFFF"
      ></path>
    </IconContainer>
  );
}
