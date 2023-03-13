import { Popover, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import styles from './index.module.less';

const presetColors = [
  '#ffffff',
  '#000000',
  '#DB3E00',
  '#FCCB00',
  '#008B02',
  '#006B76',
  '#1273DE',
  '#004DCF',
  '#5300EB',
  '#EB9694',
  '#FAD0C3',
  '#FEF3BD',
  '#C1E1C5',
  '#BEDADC',
  '#BED3F3',
  '#D4C4FB',
  {
    color: 'rgba(0,0,0,0)',
    title: '透明',
  },
];

// type ColorSelectProps = React.InputHTMLAttributes<HTMLInputElement>;
interface ColorSelectProps {
  style?: React.CSSProperties;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function ColorSelect({
  style,
  className,
  value = '#000000',
  defaultValue,
  onChange,
}: ColorSelectProps) {
  const { token } = theme.useToken();
  const [color, setColor] = useState(defaultValue || value);
  useEffect(() => {
    setColor(value);
  }, [value]);
  return (
    <Popover
      trigger={['click']}
      placement="left"
      overlayInnerStyle={{ padding: 0 }}
      content={
        <SketchPicker
          width="225px"
          color={color}
          presetColors={presetColors}
          onChange={(e) => {
            const { r, g, b, a } = e.rgb;
            const rgba = `rgba(${r},${g},${b},${a})`;
            setColor(rgba);
            onChange?.(rgba);
          }}
        />
      }
    >
      <div
        className={['kangmiColorSelect', styles.colorInput, className].join(' ')}
        style={{
          height: token.controlHeight,
          borderRadius: token.borderRadius,
          borderColor: token.colorBorder,
          // @ts-ignore
          '--hover-color': token.colorPrimary,
          ...style,
        }}
      >
        <span
          style={{
            background: color,
            borderRadius: token.borderRadius - 3,
            borderColor: token.colorBorder,
          }}
        />
      </div>
    </Popover>
  );
}
