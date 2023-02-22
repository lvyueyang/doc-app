import { theme } from 'antd';
import styles from './index.module.less';

type ColorSelectProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function ColorSelect({ style, className, ...props }: ColorSelectProps) {
  const { token } = theme.useToken();
  return (
    <input
      {...props}
      className={[styles.colorInput, className].join(' ')}
      style={{
        height: token.controlHeight,
        borderRadius: token.borderRadius,
        borderColor: token.colorBorder,
        background: '#fff',
        padding: '3px 8px',
        cursor: 'pointer',
        // @ts-ignore
        '--hover-color': token.colorPrimary,
        ...style,
      }}
      type="color"
    />
  );
}
