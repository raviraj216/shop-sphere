import type { ReactNode } from 'react';

interface Props {
  label: string;
  children: ReactNode;
}

function FormField({
  label,
  children,
}: Props) {
  return (
    <div className="space-y-2">
      <label className="font-medium">{label}</label>

      {children}
    </div>
  );
}

export default FormField;