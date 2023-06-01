import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

interface IProps<T = string> extends Omit<ButtonProps, 'onChange' | 'value'> {
  value?: T;
  onChange?: (value: T) => void;
}
function useActive<T>(value: T) {
  const [active, setActive] = useState(value);
  useEffect(() => {
    setActive(value);
  }, [value]);

  return { active, setActive };
}

type FontWeightButtonValue = 'bold' | 'normal' | string;
export function FontWeightButton({ value, onChange, ...props }: IProps<FontWeightButtonValue>) {
  const { active, setActive } = useActive(value!);
  return (
    <Button
      {...props}
      icon={<BoldOutlined />}
      type={active === 'bold' ? 'primary' : 'default'}
      onClick={(e: any) => {
        const result = active === 'bold' ? 'normal' : 'bold';
        props.onClick?.(e);
        setActive(result);
        onChange?.(result);
      }}
    />
  );
}

type FontStyleButtonValue = 'italic' | 'normal' | string;
export function FontStyleButton({ value, onChange, ...props }: IProps<FontStyleButtonValue>) {
  const { active, setActive } = useActive(value!);

  return (
    <Button
      {...props}
      icon={<ItalicOutlined />}
      type={active === 'italic' ? 'primary' : 'default'}
      onClick={(e: any) => {
        const result = active === 'italic' ? 'normal' : 'italic';
        props.onClick?.(e);
        setActive(result);
        onChange?.(result);
      }}
    />
  );
}

type UnderlineButtonValue = 'underline' | 'normal' | string;
export function UnderlineButton({ value, onChange, ...props }: IProps<UnderlineButtonValue>) {
  const { active, setActive } = useActive(value!);

  return (
    <Button
      {...props}
      icon={<UnderlineOutlined />}
      type={active === 'underline' ? 'primary' : 'default'}
      onClick={(e: any) => {
        const result = active === 'underline' ? '' : 'underline';
        props.onClick?.(e);
        setActive(result);
        onChange?.(result);
      }}
    />
  );
}

type LineThroughButtonValue = 'underline' | 'normal' | string;
export function LineThroughButton({ value, onChange, ...props }: IProps<LineThroughButtonValue>) {
  const { active, setActive } = useActive(value!);

  return (
    <Button
      {...props}
      icon={<StrikethroughOutlined />}
      type={active === 'line-through' ? 'primary' : 'default'}
      onClick={(e: any) => {
        const result = active === 'line-through' ? '' : 'line-through';
        props.onClick?.(e);
        setActive(result);
        onChange?.(result);
      }}
    />
  );
}

type VerticalAlignButtonGroupValue = React.CSSProperties['alignItems'] | string;
export function VerticalAlignButtonGroup({
  value = 'center',
  onChange,
  ...props
}: IProps<VerticalAlignButtonGroupValue>) {
  const { active, setActive } = useActive(value);

  const changeHandler = (result: VerticalAlignButtonGroupValue | string) => {
    setActive(result!);
    onChange?.(result);
  };

  return (
    <Button.Group>
      <Button
        {...props}
        icon={<VerticalAlignTopOutlined />}
        type={active === 'flex-start' ? 'primary' : 'default'}
        onClick={() => {
          changeHandler('flex-start');
        }}
      />
      <Button
        {...props}
        icon={<VerticalAlignMiddleOutlined />}
        type={active === 'center' ? 'primary' : 'default'}
        onClick={() => {
          changeHandler('center');
        }}
      />
      <Button
        {...props}
        icon={<VerticalAlignBottomOutlined />}
        type={active === 'flex-end' ? 'primary' : 'default'}
        onClick={() => {
          changeHandler('flex-end');
        }}
      />
    </Button.Group>
  );
}

type HorizontalAlignButtonGroupValue = React.CSSProperties['alignItems'] | string;
export function HorizontalAlignButtonGroup({
  value = 'center',
  onChange,
  ...props
}: IProps<HorizontalAlignButtonGroupValue>) {
  const { active, setActive } = useActive(value);

  const changeHandler = (result: HorizontalAlignButtonGroupValue | string) => {
    setActive(result!);
    onChange?.(result);
  };

  return (
    <Button.Group>
      <Button
        {...props}
        icon={<AlignLeftOutlined />}
        type={active === 'start' ? 'primary' : 'default'}
        onClick={() => {
          changeHandler('start');
        }}
      />
      <Button
        {...props}
        icon={<AlignCenterOutlined />}
        type={active === 'center' ? 'primary' : 'default'}
        onClick={() => {
          changeHandler('center');
        }}
      />
      <Button
        {...props}
        icon={<AlignRightOutlined />}
        type={active === 'end' ? 'primary' : 'default'}
        onClick={() => {
          changeHandler('end');
        }}
      />
    </Button.Group>
  );
}
