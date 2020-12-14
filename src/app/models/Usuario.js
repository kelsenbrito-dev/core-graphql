import mongoose from 'mongoose';

/** Schema para negócios relacionados ao usuário **/
const Schema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Informe o nome do usuário'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Informe o e-mail do usuário'],
        index: true,
        unique: true,
        trim: true,
    },
    senha: {
        type: String,
        required: [true, 'Informe a senha do usuário']
    },
    perfil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Perfil',
        required: [true, 'Informe perfil do usuário']
    },
    //no caso de perfil "parceiro" a empresa é obrigatória
    parceiro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa'
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa',
        required: [true, 'Informe a tenant do usuário']
    },
    root: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Usuario', Schema)