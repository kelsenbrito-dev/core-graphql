import { UserInputError } from 'apollo-server-express'
import Empresa from '../../models/Empresa';

export default {
    Query: {
        empresas: (_, __, { usuario }) => {
            if(!usuario) throw new UserInputError('Você não está autenticado.');
            return Empresa.find();
    },
        empresa: (_, { id }, { usuario }) => {
            if(!usuario) throw new UserInputError('Você não está autenticado.');
            return Empresa.findById(id);
        },
    },
    Mutation: {
        createEmpresa: (_, { data }, { usuario }) => {
            if(!usuario) throw new UserInputError('Você não está autenticado.');
            return Empresa.create(data);
        },
        updateEmpresa: (_, { id, data }, { usuario }) => {
            if(!usuario) throw new UserInputError('Você não está autenticado.');
            return Empresa.findOneAndUpdate(id, data, { new : true });
        },
        deleteEmpresa: async (_, { id }, { usuario }) => {
            if(!usuario) throw new UserInputError('Você não está autenticado.');
            return !!(await Empresa.findByIdAndDelete(id));
        },
    },
}