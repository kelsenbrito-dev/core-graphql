import mongoose from 'mongoose';

/** Schema para negócios relacionados ao perfil **/
const Schema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Informe o nome do perfil'],
        trim: true
    },
    descricao: {
        type: String,
        required: [true, 'Informe a descrição do perfil'],
        index: true,
        unique: true
    }
});

export default mongoose.model('Perfil', Schema)