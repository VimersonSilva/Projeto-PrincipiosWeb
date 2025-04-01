import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '8af51149887e821464f80343e929f7f4fbd899f3726a0b4cff7c0884eab43746492f98f02b85e06a362f8e6ba6633241759e8cfa0a4020cade0b82c9a3c366f19c61b1939af268b01b969978a7686ed4ea9d911fd48cb95d796f360896d177597538907aeffdc5a1ef39075112bfaf53cf2acfa5c2e427b21841f7afc7c28e9af14e341c4a059ec712858698965bb9541185d429a4f5c720d008082d65dccc8d9dd7cb1fa4d8328b288cc87dfab2884cc9b811f3a5f60a92c7d5fe6b6bf7fd4b898330293155dbb3f099bb3ef209c7318e1603d056a0b2d3b80ca388f8ff8fe37fda5de7a9559f9d76ccd53355e3363de1319ca1d50a5778d7abf9d62000b3b9';

export const hashPassword = async(password:string) : Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
};

//Função para comparar a senha

export const comparePassword = async (password:string, hashedPassword: string) : Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
}

//Função para gerar token JWT

export const generateToken = (userId: number, name: string, role: string = 'user'): string => {
    return jwt.sign({ id: userId, name, role }, JWT_SECRET, { expiresIn: '1h' });
};

//Funcao para verificar um token

export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET)
}


