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
    let status = false

    listaDeEstados.estados.forEach(function (descricaoEstado) {
        if (String(descricaoEstado.sigla).toUpperCase() == String(uf).toUpperCase()) {
            status = true
            retorno = {
                uf: descricaoEstado.sigla,
                descricao: descricaoEstado.nome,
                capital: descricaoEstado.capital,
                regiao: descricaoEstado.regiao
            }
            
        }
    })
    return status ? retorno : false
}

const getCapitalEstados = function (uf) {
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
    return status ? capitalDescrita : false
}

function getEstadosRegiao(regiao) {
    let infoPorRegiao = { regiao: regiao, estados: [] }
    let status = false

    //variável de iteração correta (estado = cada item do array)
    for (let estado of listaDeEstados.estados) {

        //acessa a propriedade 'regiao' do objeto estado
        if (String(estado.regiao).toUpperCase() == String(regiao).toUpperCase()) {
            status = true

            //usa a variável correta do loop
            infoPorRegiao.estados.push({
                uf: estado.sigla,
                descricao: estado.nome
            })
        }
    }

    // return após percorrer todos os estados
    return status ? infoPorRegiao : false
}

const getCapitalPais = function (){
    let infoCapital = { capitais: [] }
    let status = false

    
    for (let capitalPais of listaDeEstados.estados) {

        if (capitalPais.capital_pais) {
            status = true

            
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
    return status ? infoCapital : false
    
}


function getCidades (estadoBusca){
    // objeto de retorno
    let retorno = {}

    // vetor que recebe as cidades 
    let cidade   = []

    // contador pra saber a quantidade de cidades
    let contador = 0
    let status   = false
    
    //percorre o vetor estado  
    for(let estados of listaDeEstados.estados){

        //condicional para verificar se a busca é coerente
        if(String(estados.sigla).toUpperCase() ==  String(estadoBusca).toUpperCase()) {
            
            for( let cidadeCont of estados.cidades){
                cidade.push(cidadeCont.nome)
                contador++
            }

            retorno.uf                     =estados.sigla
            retorno.descricao              =estados.nome
            retorno.quantidade_cidades     =contador
            retorno.cidades                =cidade

            status = true
        }
    }

    if(status){
        return retorno
    }else return false 
}




module.exports = {
    getCapitalEstados,
    getCapitalPais,
    getDadosEstado,
    getCidades,
    getEstadosRegiao,
    getListaDeEstados
}


    console.log(getCidades('rj'))
    console.log(getCapitalPais())
    console.log(getEstadosRegiao('sul'))
    console.log(getListaDeEstados())
    console.log(getDadosEstado('sp'))
    console.log(getCapitalEstados('al'))