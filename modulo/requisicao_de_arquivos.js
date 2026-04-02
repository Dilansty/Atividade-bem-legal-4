/******************************************************
 * Objetivo: Maniplar dados dos estados brasileiros
 * Data: 20/03/2025
 * Autor: Allan
 * Versão: 1.0 
 ********************************************************/

//import da biblioteca da API
const listaDeEstados = require('./estados_cidades.js')

// função para listar os estados brasileiros
const getListaDeEstados = function () {
    //array vazio para dar o input dos dados na logica
    let estados = []
//estrutura de repetição que percorre a API para buscar e dar push das UFs no JSON
    listaDeEstados.estados.forEach(function (estado) {
        estados.push(estado.sigla)
    })
    //Return com a estrutura do JSON guardando a info da API
    return {
        uf: estados,
        quantidade: estados.sigla
    }
}

//função para mostrar os dados do estado
const getDadosEstado = function (uf) {
    //variaveis do status para return e guardar o JSON
    let retorno
    let status = false

    //Estrutura de repetição que percorre a todos os estados da API  
    listaDeEstados.estados.forEach(function (descricaoEstado) {
        //condicional para comparar input com info da sigla do estado da API
        if (String(descricaoEstado.sigla).toUpperCase() == String(uf).toUpperCase()) {
            status = true
            //Estruturação do JSON com as informações que preciso da API 
            retorno = {
                uf: descricaoEstado.sigla,
                descricao: descricaoEstado.nome,
                capital: descricaoEstado.capital,
                regiao: descricaoEstado.regiao
            }
            
        }
    })
    //return do status e do JSON
    return status ? retorno : false
}

//função para mostrar as capitais do estado
const getCapitalEstados = function (uf) {
     //variaveis do status para return e guardar o JSON
    let capitalDescrita
    let status = false

     //Estrutura de repetição que percorre a todos os estados da API  
    listaDeEstados.estados.forEach(function (pesquisaUF) {

        //condicional para comparar input com info da regiao da API
        if (String(pesquisaUF.sigla).toUpperCase() == String(uf).toUpperCase()) {
            status = true
            //Estruturação do JSON com as informações que preciso da API 
            capitalDescrita = {
                uf: pesquisaUF.sigla,
                descricao: pesquisaUF.nome,
                capital: pesquisaUF.capital
            }
        }


    })
    //return do status e do JSON
    return status ? capitalDescrita : false
}

//função para mostrar os estados das regioes selecionadas
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
//função para mostrar as capitais do pais ao longo da história
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
// função para mostrar cidades do estado selecionado
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



// export das funções
module.exports = {
    getCapitalEstados,
    getCapitalPais,
    getDadosEstado,
    getCidades,
    getEstadosRegiao,
    getListaDeEstados
}

