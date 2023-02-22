import { Popover, theme } from 'antd';
import { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import styles from './index.module.less';

// type ColorSelectProps = React.InputHTMLAttributes<HTMLInputElement>;
interface ColorSelectProps {
  style?: React.CSSProperties;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function ColorSelect({
  style,
  className,
  value = '#000000',
  onChange,
}: ColorSelectProps) {
  const { token } = theme.useToken();
  const [color, setColor] = useState(value);
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
          presetColors={[
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
          ]}
          onChange={(e) => {
            console.log(e);
            const { r, g, b, a } = e.rgb;
            onChange?.(`rgba(${r},${g},${b},${a})`);
          }}
        />
      }
    >
      <div
        className={[styles.colorInput, className].join(' ')}
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
            background: value,
            borderRadius: token.borderRadius,
            borderColor: token.colorBorder,
          }}
        />
      </div>
    </Popover>
  );
}
