const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
const cors = require('cors'); // Para permitir requisições do Angular

const app = express();
const port = 3000;

// Middleware para permitir CORS
app.use(cors());

// Ler o arquivo de credenciais JSON
const key = JSON.parse(fs.readFileSync('/home/guicaldana/Downloads/hydrosensepushnotif-firebase-adminsdk-bk1jh-61ee900f02.json', 'utf-8'));

// Rota para gerar o token de autenticação
app.get('/get-token', async (req, res) => {
  try {
    const client = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/firebase.messaging']
    );
    const token = await client.authorize();
    res.json({ accessToken: token.access_token });
  } catch (error) {
    console.error('Error fetching access token:', error);
    res.status(500).send('Error fetching access token');
  }
});

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
