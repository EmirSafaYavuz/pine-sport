export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'textarea' | 'select' | 'date';
  required?: boolean;
  options?: { value: any; label: string }[];
  validators?: any[];
}
