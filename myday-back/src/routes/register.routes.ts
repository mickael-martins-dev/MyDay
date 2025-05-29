
import { Router, Request, Response } from 'express';
import UserModel from '../model/User';
import * as Crypto from '../utils/Crypto';
import bcrypt from "bcryptjs";

const registerRouter = Router();

registerRouter.post('/api/register', async (request: Request, response: Response) => {
    const { pseudo, password, feelings, mail, phraseRegister } = request.body;
    const theme = request.body.theme || "colorful";
    const feeling1Encrypted = []
    feeling1Encrypted[0] = feelings[0] ? Crypto.encrypt(feelings[0]) : "";
    feeling1Encrypted[1] = feelings[1] ? Crypto.encrypt(feelings[1]) : "";
    feeling1Encrypted[2] = feelings[2] ? Crypto.encrypt(feelings[2]) : "";
    feeling1Encrypted[3] = feelings[3] ? Crypto.encrypt(feelings[3]) : "";
    const mailHashed = mail ? Crypto.hashed(mail) : "";
    const mailHash = Crypto.encrypt(mail)
    const phraseRegisterEncrypted = phraseRegister ? Crypto.encrypt(phraseRegister) : "";
    const passwordHashed = await bcrypt.hash(password, 10);
    const pseudoExist = await UserModel.findOne({ pseudo })
    const mailExist = await UserModel.findOne({ mail: mailHashed })

    if (pseudoExist) {
        return response.status(409).json({ success: false, message: 'Pseudo déjà utilisé' });
    }
    else if (mailExist) {
        return response.status(409).json({ success: false, message: 'Email déjà utilisé' });
    }
    else {
        const newUser = new UserModel({
            pseudo,
            password: passwordHashed,
            feelings: feeling1Encrypted,
            mail: mailHashed,
            mailHash: mailHash,
            theme: theme || 'colorful',
            phraseRegister: phraseRegisterEncrypted
        });
        try {
            await newUser.save();
            console.log('Utilisateur enregistré avec succès !');
            response.status(201).json({ message: 'Utilisateur créé avec succès' });
        } catch (err) {
            console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', err);
            response.status(500).json({ message: 'Erreur lors de l\'enregistrement' });
        }
    }
});

export default registerRouter;
