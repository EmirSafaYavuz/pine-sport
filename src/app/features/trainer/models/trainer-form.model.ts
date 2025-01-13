import { FormField } from '../../../core/models/form-field.model';
import { Gender } from '../../../core/models/gender.model';

export const TRAINER_FORM_FIELDS: FormField[] = [
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
    name: 'password',
    label: 'Şifre',
    type: 'password',
    required: true
  },
  {
    name: 'mobilePhone',
    label: 'Telefon',
    type: 'tel',
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
      { value: 1, label: 'Erkek' },
      { value: 2, label: 'Kadın' }
    ],
    required: true
  },
  {
    name: 'specialization',
    label: 'Uzmanlık Alanı',
    type: 'text',
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
  }
];
