import Perfil from '../../models/Perfil';

export default {
    Query: {
        perfis: () => Perfil.find(),
        perfil: (_, { id}) => Perfil.findById(id),
    },
    Mutation: {
        createPerfil: (_, { data }) => Perfil.create(data),
        updatePerfil: (_, { id, data }) => Perfil.findOneAndUpdate(id, data, { new : true }),
        deletePerfil: async (_, { id }) => !!(await Perfil.findByIdAndDelete(id)),
    },
}