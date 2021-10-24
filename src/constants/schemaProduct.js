export default {
    ['komoditas']: {
        'type': 'text',
        'required': true,
        'placeholder': 'Komoditas',
    },
    ['provinsi']: {
        'type': 'select',
        'required': true,
        'options': [],
        'placeholder': 'Pilih Provinsi',
    },
    ['kota']: {
        'type': 'select',
        'required': true,
        'options': [],
        'placeholder': 'Pilih Kota',
    },
    ['ukuran']: {
        'type': 'select',
        'required': true,
        'options': [],
        'placeholder': 'Pilih Ukuran',
    },
    ['harga']: {
        'type': 'currency',
        'required': true,
        'placeholder': 'Harga',
    },
    'Save': {
        'type': 'submit',
    },
};
