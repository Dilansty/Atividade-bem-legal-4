/******************************************************
 * Objetivo: Maniplar dados dos estados brasileiros
 * Data: 20/03/2025
 * Autor: Allan
 * Versão: 1.0 
 ********************************************************/

const listaDeEstados = require('./estados_cidades.js')


const getListaDeEstados = function () {
    let estados = []

    getListaDeEstados.estados.forEach(function (estado) {
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

function getEstadosRegiao(regiao) {
    let infoPorRegiao = { regiao: regiao, estados: [] }
    let status = false

    //variável de iteração correta (estado = cada item do array)
    for (let estado of listaDeEstados.estados) {

        //acessa a propriedade 'regiao' do objeto estado
        if (estado.regiao.toUpperCase() == regiao.toUpperCase()) {
            status = true

            //usa a variável correta do loop
            infoPorRegiao.estados.push({
                uf: estado.sigla,
                descricao: estado.nome
            })
        }
    }

    // return após percorrer todos os estados
    return infoPorRegiao
}

const getCapitalPais = function (){
    let infoCapital = { capitais: [] }
    let status = false

    
    for (let capitalPais of listaDeEstados.estados) {

        if (capitalPais.capital_pais) {
            status = true

            //usa a variável correta do loop
            infoCapital.capitais.push({
                uf:                         capitalPais.sigla,
                descricao:                  capitalPais.nome,
                capital:                    capitalPais.capital, 
                regiao:                     capitalPais.regiao, 
                capital_pais_ano_inicio:    capitalPais.capital_pais.ano_inicio, 
                capital_pais_ano_fim:       capitalPais.capital_pais.ano_fim
            })
        }
    }

    return infoCapital
}

const getCidades = function(){
    let selecaoEstado = 'sao_paulo'
    
    let totalCidades = {cidades:[]}
    let status = false

    for(let cidadeDoEstado of listaDeEstados.estados){
        if(cidadeDoEstado.nome.toUpperCase() == selecaoEstado.toUpperCase() || cidadeDoEstado.regiao.toUpperCase() == selecaoEstado.toUpperCase()){
            totalCidades.cidades.push({
                uf: cidadeDoEstado.regiao,
                descricao: cidadeDoEstado.nome,
                quantidade_cidades: listaDeEstados.estados.length,
                cidades: cidadeDoEstado.cidades
            })
        }


    }
    return totalCidades
}








    console.log(getCidades())