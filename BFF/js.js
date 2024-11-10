const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const MICRO_SERVICO_URL = 'http://localhost:5000';
const AZURE_FUNCTION_URL = 'https://crudcloud.azurewebsites.net/api/HttpTrigger1?code=36bNHUhabK0gW5geqJ51t_A41LB-gIJqaP8JnJvs-f1RAzFug6Z04w%3D%3D';

// Operações CRUD para reservas (microsserviço)

// Criar uma nova reserva
app.post('/bff/reservas', async (req, res) => {
    try {
        const response = await axios.post(`${MICRO_SERVICO_URL}/reservas`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao criar reserva:', error.message);
        res.status(500).json({ error: 'Erro ao criar reserva' });
    }
});

// Listar todas as reservas
app.get('/bff/reservas', async (req, res) => {
    try {
        const response = await axios.get(`${MICRO_SERVICO_URL}/reservas`);
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao listar reservas:', error.message);
        res.status(500).json({ error: 'Erro ao listar reservas' });
    }
});

// Atualizar uma reserva
app.put('/bff/reservas/:id', async (req, res) => {
    try {
        const response = await axios.put(`${MICRO_SERVICO_URL}/reservas/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao atualizar reserva:', error.message);
        res.status(500).json({ error: 'Erro ao atualizar reserva' });
    }
});

// Deletar uma reserva
app.delete('/bff/reservas/:id', async (req, res) => {
    try {
        const response = await axios.delete(`${MICRO_SERVICO_URL}/reservas/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao deletar reserva:', error.message);
        res.status(500).json({ error: 'Erro ao deletar reserva' });
    }
});

// Operações CRUD para usuários (Azure Function)

// Listar todos os usuários
app.get('/bff/usuarios', async (req, res) => {
    try {
        const response = await axios.get(`${AZURE_FUNCTION_URL}`);
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao listar usuários:', error.message);
        res.status(500).json({ error: 'Erro ao listar usuários' });
    }
});

// Criar um novo usuário
app.post('/bff/usuarios', async (req, res) => {
    try {
        const response = await axios.post(`${AZURE_FUNCTION_URL}`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao criar usuário:', error.message);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// Atualizar um usuário
app.put('/bff/usuarios/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const response = await axios.put(`${AZURE_FUNCTION_URL}&id=${userId}`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error.message);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

// Deletar um usuário
app.delete('/bff/usuarios/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const response = await axios.delete(`${AZURE_FUNCTION_URL}&id=${userId}`);
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao deletar usuário:', error.message);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
});

// Inicializando o servidor BFF
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`BFF rodando na porta ${PORT}`);
});