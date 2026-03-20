/******************************************************
 * Objetivo: Maniplar dados dos estados brasileiros
 * Data: 20/03/2025
 * Autor: Allan
 * Versão: 1.0 
 ********************************************************/

const listaDeEstados = require('./estados_cidades.js')

const getListaDeEstados = function () {
    let estados = []

    listaDeEstados.estados.forEach(function (estado) {
        estados.push(estado.sigla)
    })
    return {
        uf: estados,
        quantidade: estados.sigla
    }
}



const getDadosEstado = function (uf) {
    let retorno

    listaDeEstados.estados.forEach(function (descricaoEstado) {
        if (descricaoEstado.sigla == uf) {
            retorno = {
                uf: descricaoEstado.sigla,
                descricao: descricaoEstado.nome,
                capital: descricaoEstado.capital,
                regiao: descricaoEstado.regiao
            }
        }
    })
    return retorno

}

const getCapitalEstados = function () {
    let uf = `SP`
    let capitalDescrita
    let status = false

    listaDeEstados.estados.forEach(function (pesquisaUF) {
        if (String(pesquisaUF.sigla).toUpperCase() == String(uf).toUpperCase()) {
            status = true
            capitalDescrita = {
                uf: pesquisaUF.sigla,
                descricao: pesquisaUF.nome,
                capital: pesquisaUF.capital
            }
        }


    })
    return capitalDescrita
}

const getEstadosRegiao = function () {
    let regiao = 'nordeste'
    let buscaRegiao
    let printaEstados
    listaDeEstados.estados.forEach(function (estadoPorRegiao) {

        if (String(estadoPorRegiao.regiao).toUpperCase() == String(regiao).toUpperCase()) {
            console.log('deu bom')
            printaEstados.push = {
            uf: estadoPorRegiao.nome, descricao: estadoPorRegiao.nome
            
        }
            buscaRegiao = {
                regiao: estadoPorRegiao.regiao,
                
                    
                
            }
        }
    })
    

    return buscaRegiao
}

console.log(getEstadosRegiao())

