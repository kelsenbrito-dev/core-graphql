import { UserInputError } from 'apollo-server'
import bcrypt from 'bcryptjs';
import Usuario from '../../models/Usuario';
import Perfil from '../../models/Perfil';
import Empresa from '../../models/Empresa';
import generator from '../../../helpers/generator';

export default {
    Usuario: {
        perfil: (usuario) => Perfil.findById(usuario.perfil),
        parceiro: (usuario) => Empresa.findById(usuario.parceiro),
        tenant: (usuario) => Empresa.findById(usuario.tenant)
    },
    Query: {
        usuarios: (_, __, { usuario }) => {
            if(!usuario) throw new UserInputError('Você não está autenticado.');
            return Usuario.find();
        },

        usuario: (_, { id }, { usuario }) => {
            if(!usuario) throw new UserInputError('Você não está autenticado.');
            return Usuario.findById(id)
        }
    },
    Mutation: {
        login: async (_, { email, senha }) => {
            //valida os dados
            if(email == null || senha == null || email == undefined || senha == undefined){
                throw new UserInputError('O e-mail e senha são obrigatórios.');
            }
            
            //verifica se o usuário existe
            const usuario = await Usuario.findOne({ email: email});
            if(!usuario){
                throw new UserInputError(`Usuário ${email} não encontrado.`, { email });
            }else if(!bcrypt.compareSync(senha, usuario.senha)){
                throw new UserInputError('Senha incorreta.');
            }else{
                usuario.token = generator.createToken(usuario)
                return usuario;
            }
        },

        createUsuario: async (_, { data }, { usuario }) => {
            if(!usuario) throw new UserInputError('Você não está autenticado.');
            data.senha = await bcrypt.hash(data.senha, 8);

            //grava o usuário
            return await Usuario.create(data).then((usuario)=>{
                return usuario;
            }).catch((error) => {
                throw new UserInputError(error.message);
            });
        },

        updateUsuario: async (_, { id, data }, { usuario }) => {
            if(!usuario) throw new UserInputError('Você não está autenticado.');
            data.senha = await bcrypt.hash(data.senha, 8);
            return Usuario.findOneAndUpdate(id, data, { new : true });
        },
        deleteUsuario: async (_, { id }, { usuario }) => {
            if(!usuario) throw new UserInputError('Você não está autenticado.');
            return !!(await Usuario.findByIdAndDelete(id));
        },
    },
}