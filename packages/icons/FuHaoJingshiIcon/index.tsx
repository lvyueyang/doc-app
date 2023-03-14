import React from 'react';
import type { IconContainerProps } from '../IconContainer';
import { IconContainer } from '../IconContainer';

export function FuHaoJingshiIcon(props: IconContainerProps) {
  return (
    <IconContainer viewBox="0 0 1024 1024" {...props}>
      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#F85767"></path>
      <path
        d="M542.752 207.968l290.992 504c12.304 21.28-3.088 48-27.712 48H224.064c-24.64 0-40.032-26.72-27.728-48l290.992-504c12.32-21.28 43.104-21.28 55.424 0z m-27.712 400c-26.512 0-48 21.44-48 48s21.488 48 48 48 48-21.44 48-48-21.488-48-48-48z m0-272c-17.68 0-32 14.4-32 32v176c0 17.6 14.32 32 32 32s32-14.4 32-32v-176c0-17.6-14.32-32-32-32z"
        fill="#FFFFFF"
      ></path>
    </IconContainer>
  );
}
