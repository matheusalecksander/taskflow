### Como executar a API

1. Clone este projeto

```bash
git clone https://github.com/matheusalecksander/taskflow.git
```

2. Crie um arquivo .env e insira os seguintes dados

```
  JWT_SECRET=3aw$@42424324212duaisdha1
  JWT_PRIVATE_SECRET=@!4432365a$d@a$sdasiojdo3901283
  DATABASE_URL=postgresql://postgres:123@localhost:5432/taskflow
```

3. Entre na pasta taskflow-server e execute o projeto

```
cd taskflow-server && npm run start:dev
```

Este comando irá iniciar o banco de dados, que está rodando via docker, depois irá fazer
as migrações para criar as tabelas no banco de dados, fará um seed para registrar um usuário e por
fim irá iniciar a API

### Teste unitários

Para verificar os testes unitários execute

```bash
npm run test
```

### Como executar o frontend

1. Entre na pasta taskflow-client e execute

```bash
npm run dev
```

Você pode realizar o login no sistema utilizando o usuário que foi criado pelo seed executado pela api

email: admin@admin.com
senha: admin