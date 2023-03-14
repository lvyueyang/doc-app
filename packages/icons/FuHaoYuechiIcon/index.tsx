import React from 'react';
import type { IconContainerProps } from '../IconContainer';
import { IconContainer } from '../IconContainer';

export function FuHaoYuechiIcon(props: IconContainerProps) {
  return (
    <IconContainer viewBox="0 0 1024 1024" {...props}>
      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#7F68DA"></path>
      <path
        d="M504 160c26.512 0 48 21.44 48 48v16h80a64 64 0 1 1 0 128h-80v32H608a40 40 0 0 1 0 80h-56l0.016 54.624C625.872 539.504 680 607.376 680 688c0 97.28-78.8 176-176 176s-176-78.72-176-176c0-80.64 54.128-148.496 128-169.376V208c0-26.56 21.488-48 48-48z m0 464a64 64 0 1 0 0 128 64 64 0 0 0 0-128z"
        fill="#FFFFFF"
      ></path>
    </IconContainer>
  );
}
