import React from 'react';
import type { IconContainerProps } from '../IconContainer';
import { IconContainer } from '../IconContainer';

export function FuHaoShijianIcon(props: IconContainerProps) {
  return (
    <IconContainer viewBox="0 0 1024 1024" {...props}>
      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#1E90F4"></path>
      <path
        d="M512 208c26.512 0 48 21.44 48 48v260.16l121.936 121.92a47.936 47.936 0 0 1 0 67.84 48.032 48.032 0 0 1-67.872 0L464 555.84V256c0-26.56 21.488-48 48-48z"
        fill="#FFFFFF"
      ></path>
    </IconContainer>
  );
}
