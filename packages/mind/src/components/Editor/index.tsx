import { useEffect, useRef } from 'react';

interface EditorProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onChange'> {
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}
export default function Editor({ value = '', disabled, onChange, ...props }: EditorProps) {
  const domRef = useRef<HTMLDivElement>(null);
  const changeHandler = (newValue: string) => {
    onChange?.(newValue);
  };

  useEffect(() => {
    if (domRef.current) {
      const content = domRef.current.innerHTML;
      if (value !== content) {
        domRef.current.innerHTML = value;
      }
    }
  }, [value]);

  return (
    <div
      {...props}
      ref={domRef}
      contentEditable={!disabled}
      onInput={(e: any) => {
        changeHandler(e.target.innerHTML);
      }}
    />
  );
}
