import { cls } from '@kangmi/utils';
import React from 'react';

export interface IconContainerProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function IconContainer({
  className,
  style,
  children,
  ...props
}: React.PropsWithChildren<IconContainerProps>) {
  return (
    <span className={cls([className, 'kangmi-icon'])} style={style}>
      <svg {...props} style={{ width: '1em', height: '1em', ...style }}>
        {children}
      </svg>
    </span>
  );
}
