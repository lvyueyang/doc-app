import React from 'react';
import type { IconContainerProps } from '../IconContainer';
import { IconContainer } from '../IconContainer';

export function JinDu3Icon(props: IconContainerProps) {
  return (
    <IconContainer viewBox="0 0 1024 1024" {...props}>
      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FF900D"></path>
      <path
        d="M512 64l-0.016 447.984L512 512l316.8 316.8a448.096 448.096 0 0 1-633.6 0 448.096 448.096 0 0 1-0.016-633.584l0.016-0.016A448.096 448.096 0 0 1 512 64z"
        fill="#FFFFFF"
      ></path>
    </IconContainer>
  );
}
