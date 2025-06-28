import { Request, Response, RequestHandler } from 'express'; // <-- Confirme esta linha
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const login: RequestHandler = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { username: username } });
        if (!user) { return res.status(401).json({ message: 'Usuário não encontrado.' }); }
        const passwordMatch = user.password === password;
        if (!passwordMatch) { return res.status(401).json({ message: 'Credenciais inválidas.' }); }
        return res.status(200).json({ message: 'Login bem-sucedido!', role: user.role });
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const registerUser: RequestHandler = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) { return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' }); }
    try {
        const existingUser = await prisma.user.findUnique({ where: { username: username } });
        if (existingUser) { return res.status(409).json({ message: 'Nome de usuário já existe.' }); }
        const newUser = await prisma.user.create({
            data: { username, password: password, role: 'aluno' },
        });
        return res.status(201).json({ message: 'Aluno cadastrado com sucesso!', user: { username: newUser.username, role: newUser.role } });
    } catch (error) {
        console.error('Erro no cadastro:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const getWords: RequestHandler = async (req, res) => {
    try {
        const words = await prisma.word.findMany();
        return res.status(200).json(words.map(w => w.content));
    } catch (error) {
        console.error('Erro ao buscar palavras:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const saveWords: RequestHandler = async (req, res) => {
    const { words } = req.body;
    if (!Array.isArray(words)) { return res.status(400).json({ message: 'Formato inválido. Esperado um array de palavras.' }); }
    try {
        await prisma.word.deleteMany({});
        await prisma.word.createMany({ data: words.map((word: string) => ({ content: word })) });
        return res.status(200).json({ message: 'Palavras salvas com sucesso!', words: words });
    } catch (error) {
        console.error('Erro ao salvar palavras:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};