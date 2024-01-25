# App

GymPass style app.

## RFs (Requisitos Funcionais)

- [x] Dever ser possivel se cadastrar;
- [x] Dever ser possivel se autenticar;
- [x] Dever ser possivel obter o perfil de um usuario logado;
- [x] Dever ser possivel obter o número de check-ins realizados pelo usuario logado;
- [x] Dever ser possivel o usuario obter seu historico de check-ins;
- [x] Dever ser possivel o usuario buscar academias proximas;
- [x] Dever ser possivel o usuario buscar academias pelo nome;
- [x] Dever ser possivel o usuario realizar check-in em uma academia;
- [x] Dever ser possivel validar o check-in de um usuario;
- [x] Dever ser possivel cadastrar uma academia;

## RNs (Regras de negocio)

- [x] O usuario nao deve poder se cadastrar com um e-mail duplicado;
- [x] O usuario nao pode fazer 2 check-ins no mesmo dia;
- [x] O usuario nao pode fazer check-in se nao estiver perto (100m) da academia;
- [x] O check-in so pode ser validado até 20 minutos apos criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia so pode ser cadastrada por administradores;

## RNFs (Requisitos nao-funcionais)

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persitidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por pagina;
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token);