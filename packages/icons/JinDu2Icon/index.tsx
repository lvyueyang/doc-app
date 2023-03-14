import React from 'react';
import type { IconContainerProps } from '../IconContainer';
import { IconContainer } from '../IconContainer';

export function JinDu2Icon(props: IconContainerProps) {
  return (
    <IconContainer viewBox="0 0 1024 1024" {...props}>
      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FF6610"></path>
      <path
        d="M512 512l316.8 316.8A448.096 448.096 0 0 1 512 960V512z m0-448l-0.016 447.984L512 512v448c-118.8 0-232.8-47.2-316.8-131.2a448.096 448.096 0 0 1-0.016-633.584l0.016-0.016A448.096 448.096 0 0 1 512 64z m448 448c0 118.8-47.2 232.8-131.2 316.8L512 512h448z"
        fill="#FFFFFF"
      ></path>
    </IconContainer>
  );
}
