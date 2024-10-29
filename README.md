# Golden Raspberry Awards.

[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D22.0.0-brightgreen.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Description

API RESTful para ler a lista de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards.

Obs: Necessario utilizar a versão node.js >= 22.0.0

## Instalação

Clonar este repositório

```
$ git clone https://github.com/everbgs/gra-api-node.git
$ cd gra-api-node
```

Instalar dependências específicas do projeto

```
$ npm install
```

**Arquivo .env**

```
PORT=
CSV=
```

- `PORT` - Porta da API (Pdrão 3000)
- `CSV` - Diretorio com o arquivo csv (Padrão /src/data/movielist.csv)


## Execução da API

Para iniciar o servidor executar o seguinte comando

```
$ npm run start
```

A API possui uma única rota relacionada ao teste: ```/api/producers/intervals```, e um único verbo interage com a mesma: ```GET```.
A URI padrão é: ```http://localhost:3000/api/producers/intervals```

## Execução Testes

Para executar os testes
```
$ npm run test
```




## Fonte de dados

Os registros são importatos do arquivo csv src/data/movielist.csv ao iniciar a aplicação e estão sendo armazenados diretamenta na memoria utilizando o banco SQLite. Para importar outro arquivo basta substituir o aqruivo na pasta src/data com o mesmo nome "movielist" ou criar um arquivo .env e altear a tag CSV com um caminho/arquivo.csv
