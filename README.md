# App

GymPass style app.

## RFs (Requisitos Funcionais)

- [ ] Dever ser possivel se cadastrar;
- [ ] Dever ser possivel se autenticar;
- [ ] Dever ser possivel obter o perfil de um usuario logado;
- [ ] Dever ser possivel obter o número de check-ins realizados pelo usuario logado;
- [ ] Dever ser possivel o usuario obter seu historico de check-ins;
- [ ] Dever ser possivel o usuario buscar academias proximas;
- [ ] Dever ser possivel o usuario buscar academias pelo nome;
- [ ] Dever ser possivel o usuario realizar check-in em uma academia;
- [ ] Dever ser possivel validar o check-in de um usuario;
- [ ] Dever ser possivel cadastrar uma academia;

## RNs (Regras de negocio)

- [ ] O usuario nao deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuario nao pode fazer 2 check-ins no mesmo dia;
- [ ] O usuario nao pode fazer check-in se nao estiver perto (100m) da academia;
- [ ] O check-in so pode ser validado até 20 minutos apos criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia so pode ser cadastrada por administradores;

## RNFs (Requisitos nao-funcionais)

- [ ] A senha do usuario precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persitidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por pagina;
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token);