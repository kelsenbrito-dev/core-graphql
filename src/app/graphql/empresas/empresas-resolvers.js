import Empresa from '../../models/Empresa';

export default {
    Query: {
        empresas: () => Empresa.find(),
        empresa: (_, { id}) => Empresa.findById(id),
    },
    Mutation: {
        createEmpresa: (_, { data }) => Empresa.create(data),
        updateEmpresa: (_, { id, data }) => Empresa.findOneAndUpdate(id, data, { new : true }),
        deleteEmpresa: async (_, { id }) => !!(await Empresa.findByIdAndDelete(id)),
    },
}