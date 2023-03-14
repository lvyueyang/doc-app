import React from 'react';
import type { IconContainerProps } from '../IconContainer';
import { IconContainer } from '../IconContainer';

export function JianTouZuoIcon(props: IconContainerProps) {
  return (
    <IconContainer viewBox="0 0 1024 1024" {...props}>
      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FF863B"></path>
      <path
        d="M903.568 448a32 32 0 0 0-32-32h-448a32 32 0 0 0-32 32v128a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32v-128z"
        fill="#FFFFFF"
      ></path>
      <path
        d="M117.536 499.888a16 16 0 0 0 0 24.192L413.088 780c10.368 8.96 26.48 1.6 26.48-12V256.016c0-13.696-16.112-21.056-26.48-12.096L117.536 499.888z"
        fill="#FFFFFF"
      ></path>
    </IconContainer>
  );
}
