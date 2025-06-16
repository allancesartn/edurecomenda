# EduRecomenda

Projeto acadêmico desenvolvido para a disciplina **Aplicações para Internet**. Trata-se de uma aplicação web dividida em duas partes:

- **Backend (API em Python + Flask)**
- **Frontend (HTML + JavaScript com Vite)**

O sistema simula uma plataforma de recomendação de cursos.

#Executando o back

#Backend (API)

1. Acesse a pasta `edurecomenda_api/`:
   ```
   cd edurecomenda_api
   ```

2. Instale o Python 3 (caso ainda não tenha):  
   [https://www.python.org](https://www.python.org)

3. Instale as dependências:
   ```
   pip install -r requirements.txt
   ```

4. Execute a aplicação:
   ```
   python app.py
   ```

5. Acesse a documentação da API:
   ```
   http://localhost:5000/apidocs
   ```

---

#Executando o front

1. Acesse a pasta `edurecomenda_frontend/`:
   ```
   cd edurecomenda_frontend
   ```

2. Instale o Node.js (caso ainda não tenha):  
   [https://nodejs.org](https://nodejs.org)

3. Instale as dependências:
   ```
   npm install
   ```

4. Execute o frontend:
   ```
   npm run dev
   ```

5. Acesse no navegador:
   ```
   http://localhost:5173
   ```

#Estrutura do Projeto

#edurecomenda_api/ (Backend)

- `app.py`: arquivo principal que inicia o servidor Flask.
- `requirements.txt`: lista de dependências Python.
- `database.db`: banco de dados MySQL com os dados da aplicação.
- `controllers/`: lógica para controlar rotas e dados da API.
- `README.txt`: descrição técnica simples da API.

#edurecomenda_frontend/ (Frontend)

- `index.html`: página principal da aplicação.
- `package.json`: define dependências e scripts do projeto.
- `vite.config.js`: configuração do Vite (ferramenta de desenvolvimento).
- `node_modules/`: pastas com bibliotecas instaladas (não precisa subir no GitHub).

#Funcionalidades (geral)

- Exibição de cursos disponíveis.
- Consumo da API para listar, visualizar e organizar dados.
- Documentação automática da API com Swagger (via Flasgger).

#Tecnologias Utilizadas

- **Backend**: Python, Flask, Flasgger, SQLite
- **Frontend**: HTML, JavaScript, Vite
- **Outros**: Swagger (documentação), Node.js (ambiente do frontend), React (front)


#Projeto acadêmico

Desenvolvido como parte da disciplina **Aplicações para Internet**.
