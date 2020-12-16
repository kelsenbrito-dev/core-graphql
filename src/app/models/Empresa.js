import mongoose from 'mongoose';

/** Schema para negócios relacionados a empresa **/
const Schema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Informe o nome da empresa'],
        trim: true,
        index: true,
        unique: true,
    },
    cnpj: {
        type: String,
        required: [true, 'Informe o cnpj da empresa'],
        maxlength: 14
    }
});

export default mongoose.model('Empresa', Schema);