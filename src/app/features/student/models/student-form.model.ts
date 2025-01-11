import { FormField } from '../../../core/models/form-field.model';

export const STUDENT_FORM_FIELDS: FormField[] = [
  {
    name: 'fullName',
    label: 'Ad Soyad',
    type: 'text',
    required: true
  },
  {
    name: 'email',
    label: 'E-posta',
    type: 'email',
    required: true
  },
  {
    name: 'mobilePhone',
    label: 'Telefon',
    type: 'text',
    required: true
  },
  {
    name: 'birthDate',
    label: 'Doğum Tarihi',
    type: 'date',
    required: true
  },
  {
    name: 'gender',
    label: 'Cinsiyet',
    type: 'select',
    options: [
      { value: 0, label: 'Erkek' },
      { value: 1, label: 'Kadın' }
    ],
    required: true
  },
  {
    name: 'address',
    label: 'Adres',
    type: 'textarea',
    required: true
  },
  {
    name: 'notes',
    label: 'Notlar',
    type: 'textarea',
    required: false
  },
  {
    name: 'password',
    label: 'Şifre',
    type: 'password',
    required: true
  },
  {
    name: 'branchId',
    label: 'Şube',
    type: 'select',
    options: [],
    required: true
  },
  {
    name: 'parentId',
    label: 'Veli',
    type: 'select',
    options: [],
    required: true
  }
];
