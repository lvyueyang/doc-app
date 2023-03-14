import React from 'react';
import type { IconContainerProps } from '../IconContainer';
import { IconContainer } from '../IconContainer';

export function FuHaoIPhoneIcon(props: IconContainerProps) {
  return (
    <IconContainer viewBox="0 0 1024 1024" {...props}>
      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#125CEA" />
      <path
        d="M672 176a64 64 0 0 1 64 64v544a64 64 0 0 1-64 64H352a64 64 0 0 1-64-64V240a64 64 0 0 1 64-64h320z m0 32H352c-16.88 0-30.688 13.12-31.92 29.616L320 240v544c0 16.8 13.04 30.688 29.6 31.904L352 816h320c16.88 0 30.688-13.12 31.92-29.616L704 784V240c0-17.6-14.32-32-32-32z m-13.328 16c16.192 0 29.328 13.6 29.328 30.24v515.52c0 16.64-13.136 30.24-29.328 30.24H365.328C349.136 800 336 786.4 336 769.76V254.24c0-16.64 13.136-30.24 29.328-30.24h293.344zM608 720H416c-8.832 0-16 7.2-16 16s7.168 16 16 16h192c8.832 0 16-7.2 16-16s-7.168-16-16-16z"
        fill="#FFFFFF"
      />
    </IconContainer>
  );
}
