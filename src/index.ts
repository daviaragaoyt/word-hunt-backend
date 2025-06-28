// src/index.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3001; // Usamos a porta 3001 para não conflitar com o frontend (3000)

// Middlewares
app.use(cors()); // Permite que o frontend faça requisições ao backend
app.use(bodyParser.json()); // Habilita o Express a ler JSON no corpo das requisições

// Todas as rotas da API terão o prefixo /api
app.use('/api', routes);

// Rota de teste simples para verificar se o servidor está online
app.get('/', (req, res) => {
    res.send('Backend do Caça-Palavras Binário funcionando!');
});

// Inicia o servidor e o coloca para escutar na porta definida
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});