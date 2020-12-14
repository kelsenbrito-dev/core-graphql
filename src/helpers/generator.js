import { sign, verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

module.exports = {
    createToken(usuario){
        return sign({ usuario }, authConfig.secret, { expiresIn: authConfig.expiresIn });
    },
    verifyToken(token){
        return verify(token, authConfig.secret, function(err, decoded) {
            return decoded.usuario;
        });
    }
};