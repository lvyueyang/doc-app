import React from 'react';
import type { IconContainerProps } from '../IconContainer';
import { IconContainer } from '../IconContainer';

export function FuHaoJiesuoIcon(props: IconContainerProps) {
  return (
    <IconContainer viewBox="0 0 1024 1024" {...props}>
      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#28BF5A"></path>
      <path
        d="M512 168c106.08 0 192 85.92 192 192v8c0 17.6-14.4 32-32 32s-32-14.4-32-32v-8c0-70.72-57.28-128-128-128s-128 57.28-128 128v96h384c17.6 0 32 14.4 32 32v304c0 17.6-14.4 32-32 32H256c-17.6 0-32-14.4-32-32v-304c0-17.6 14.4-32 32-32h64v-96c0-106.08 85.92-192 192-192z m8 368c-39.84 0-72 32.16-72 72 0 25.024 12.688 47.04 32 59.92V704l0.08 2.624A40.016 40.016 0 0 0 560 704v-36.096c19.312-12.896 32-34.88 32-59.904 0-39.84-32.16-72-72-72z"
        fill="#FFFFFF"
      ></path>
    </IconContainer>
  );
}
