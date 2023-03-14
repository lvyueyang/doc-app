import React from 'react';
import type { IconContainerProps } from '../IconContainer';
import { IconContainer } from '../IconContainer';

export function FuHaoChahaoIcon(props: IconContainerProps) {
  return (
    <IconContainer viewBox="0 0 1024 1024" {...props}>
      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#F85767"></path>
      <path
        d="M302.064 302.048a48.032 48.032 0 0 1 67.872 0l352 352a47.936 47.936 0 0 1 0 67.84 48.032 48.032 0 0 1-67.872 0l-352-352a47.936 47.936 0 0 1 0-67.84z"
        fill="#FFFFFF"
      ></path>
      <path
        d="M721.936 302.048a47.936 47.936 0 0 1 0 67.84l-352 352a48.032 48.032 0 0 1-67.872 0 47.936 47.936 0 0 1 0-67.84l352-352a48.032 48.032 0 0 1 67.872 0z"
        fill="#FFFFFF"
      ></path>
    </IconContainer>
  );
}
