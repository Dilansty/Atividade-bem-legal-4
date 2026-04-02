/*****************************************************************************************
 * Objetivo: Arquivo responsavel pela criação da API do projeto de Estados e Cidades
 * Data: 01/04/2026
 * Autor: Allan Almeida
 * Versão: 1.0 
 * 
 * Instalação do EXPRESS - npm install express --save
 *          Dependencia responsável pela utilização do protocolo HTTP para criar uma API
 * 
 * Instalação do CORS    - npm install cors --save
 *          Dependencia responsável pelas configurações a serem realizadas para a permissão de acesso da API
 * 
******************************************************************************************/

//import das dependencias para criar a API
const express = require('express')
const cors = require('cors')
const estadosCidades = require('./modulo/requisicao_de_arquivos')

//Criando um objeto para manipular o EXPRESS
const app = express()

//conjunto de permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: ['*'],// a origem da requisição podendo ser um IP ou um "*" que signigica todos os elementos
    methods: 'GET', // sõa os verbos que serão liberados na API(GET, POST, PUT e DELETE),
    allowedHeaders: ['Content-Type', 'Autorizaton']//sõa permissões de cabeçalho do COrs
}

//configura as permissões da API através do CORS
app.use(cors(corsOptions))

//Response -> são retornos da API
//Request -> são chegadas de dados na API


//Criando EndPoints para a API
//Retornada dados dos estados filtrando o UF
app.get('/v1/senai/dados/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let estado = estadosCidades.getDadosEstado(sigla)

    if (estado) {
        response.status(200)
        response.json(estado)

    }
    else {
        response.status(404)
        response.json({ "message": "o estado informado não foi encontrado!" })
    }
})

//Retorna dados dos estados que forma capitais do Brasil
app.get('/v1/senai/estados/capital/brasil', function (request, response) {

    let estados = estadosCidades.getCapitalPais()

    response.status(200)
    response.json(estados)

})

//Retorna dados dos estados filtrando pela região
app.get('/v1/senai/estados/regiao/:regiao', function (request, response) {
    let regiao = request.params.regiao
    let estados = estadosCidades.getEstadosRegiao(regiao)

    if (estados) {
        response.status(200)
        response.json(estados)
    }
    else {
        response.status(404)
        response.json({ "message": "a região informada não foi encontrada!" })

    }
})

app.get('/v1/senai/capital/estados/:uf', function(request, response){

    let sigla = request.params.uf
    let capitalEstado = estadosCidades.getCapitalEstados(sigla)

    if (capitalEstado) {
        response.status(200)
        response.json(capitalEstado)

    }
    else {
        response.status(404)
        response.json({ "message": "o estado informado não foi encontrado!" })
    }
})

//Retorna dados das cidades filtrando pelo UF
app.get('/v1/senai/cidades/:uf', function (request, response) {
    let estadoBusca = request.params.uf
    let cidades = estadosCidades.getCidades(estadoBusca)

    if (cidades) {
        response.status(200)
        response.json(cidades)
    }
    else {
        response.status(404)
        response.json({ "message": "o estado informado não foi encontrado!" })
    }
})

//Retorna os dados dos estados do Brasil pela UF
app.get('/v1/senai/estados', function (request, response) {

    let estados = estadosCidades.getListaDeEstados()

    response.json(estados)
    response.status(200)

})

app.get('/v1/senai/help', function (request, response) {
    let docAPI = {
        'API-description': 'API para manipular dados de Estados e Cidades',
        'date': '2026-04-02',
        'Development': 'Allan Almeida',
        'Version': '1.0',
        'Endpoints': [
            {
                'id': 1,
                'Rota 1': '/v1/senai/estados',
                'obs': 'retorna a lista de todos os estados'
            },
            {
                'id': 2,
                'Rota 2': '/v1/senai/dados/estado/:uf',
                'obs': 'retorna os dados do estado filtrando pela sigla do estado'
            },
            {
                'id': 3,
                'Rota 3': '/v1/senai/capital/estado/:uf',
                'obs': 'retorna os dados da capital filtrando pela sigla do estado'
            },

            {
                'id': 4,
                'Rota 4': '/v1/senai/estados/capita/brasil',
                'obs': 'retorna os dados da capital filtrando pela sigla do estado'
            },

            {
                'id': 5,
                'Rota 5': '/v1/senai/estados/regiao/:regiao',
                'obs': 'retorna os estados referentes a uma região'
            },

            {
                'id': 6,
                'Rota 6': '/v1/senai/cidades/:uf',
                'obs': 'retorna todas as cidades filtrando pela sigla do estado'
            }
        ]

    }
    response.status(200)
    response.json(docAPI)
})

//serve para inicializar a API para receber requisições
app.listen(8080, function () {
    console.log('API funcionando e aguardando novas requisições . . .')
})