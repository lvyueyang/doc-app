import React from 'react';
import type { IconContainerProps } from '../IconContainer';
import { IconContainer } from '../IconContainer';

export function FuHaoTubiaoIcon(props: IconContainerProps) {
  return (
    <IconContainer viewBox="0 0 1024 1024" {...props}>
      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#DC51BD"></path>
      <path d="M480 480V0h96v524.8c0 28.32-22.928 51.2-51.2 51.2H0v-96h480z" fill="#FFFFFF"></path>
    </IconContainer>
  );
}
