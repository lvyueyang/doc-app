import React from 'react';
import type { IconContainerProps } from '../IconContainer';
import { IconContainer } from '../IconContainer';

export function FuHaoTishiIcon(props: IconContainerProps) {
  return (
    <IconContainer viewBox="0 0 1024 1024" {...props}>
      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#125CEA"></path>
      <path
        d="M512 400c26.512 0 48 21.44 48 48v320c0 26.56-21.488 48-48 48s-48-21.44-48-48V448c0-26.56 21.488-48 48-48z m0-192a64 64 0 1 1 0 128 64 64 0 0 1 0-128z"
        fill="#FFFFFF"
      ></path>
    </IconContainer>
  );
}
