import { UserInputError } from 'apollo-server-express'
import Perfil from '../../models/Perfil';

export default {
    Query: {
        perfis: (_, __, { usuario }) => {
            if(!usuario) throw new UserInputError('Você não está autenticado.');
            return Perfil.find();
        },
        perfil: (_, { id}, { usuario }) => {
            if(!usuario) throw new UserInputError('Você não está autenticado.');
            return Perfil.findById(id);
        },
    },
    Mutation: {
        createPerfil: (_, { data }, { usuario }) => {
            if(!usuario) throw new UserInputError('Você não está autenticado.');
            return Perfil.create(data);
        },
        updatePerfil: (_, { id, data }, { usuario }) => {
            if(!usuario) throw new UserInputError('Você não está autenticado.');
            return Perfil.findOneAndUpdate(id, data, { new : true });
        },
        deletePerfil: async (_, { id }, { usuario }) => {
            if(!usuario) throw new UserInputError('Você não está autenticado.');
            return !!(await Perfil.findByIdAndDelete(id));
        },
    },
}