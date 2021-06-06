'use strict'
const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.worldometers.info/coronavirus/';

class MinerController {
  async index({ response, auth }) {
    const tabelaPaises = [];
    let aux = 0;
    let posicao;
    let nomePais;
    let totalCases;
    let newCases;
    let totalDeaths;
    let newDeaths;
    let totalRecovered;
    let activeCases;
    let seriousCritical;
    let totCasesPerMilion;
    let deathsPerMilion;
    let totalTests;
    let testsPerMilion;
    let population;
    
    await axios(url).then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      let tabelaCovid = $('#main_table_countries_today tr');

      console.log(tabelaCovid['3'])
      delete tabelaCovid['0']
      delete tabelaCovid['1']
      delete tabelaCovid['2']
      delete tabelaCovid['3']
      delete tabelaCovid['4']
      delete tabelaCovid['5']
      delete tabelaCovid['6']
      delete tabelaCovid['7']
      delete tabelaCovid['8']
      tabelaCovid = tabelaCovid.find('td');



      tabelaCovid.each(function(){
        switch (aux) {
          case 0:
            posicao = $(this).text();            
            aux++;            
            break;
          case 1:
          nomePais = $(this).text();
          aux++;
          break;
          case 2:
            totalCases = $(this).text();
            aux++;
            break;
          case 3:
            newCases = $(this).text();
            aux++;
            break;
          case 4:
            totalDeaths = $(this).text();
            aux++;
            break;
          case 5:
            newDeaths = $(this).text();
            aux++;
            break;
          case 6:
            totalRecovered = $(this).text();
            aux++;
            break;
          case 7:
            activeCases = $(this).text();
            aux++;
            break;
          case 8:
            seriousCritical = $(this).text();
            aux++;
            break;
          case 9:
            totCasesPerMilion = $(this).text();
            aux++;
            break;
          case 10:
            deathsPerMilion = $(this).text();
            aux++;
            break;
          case 11:
            totalTests = $(this).text();
            aux++;
            break;
          case 12:
            testsPerMilion = $(this).text();
            aux++;
            break;
          case 13:
            population = $(this).text();            
            tabelaPaises.push({
              posicao,
              nomePais,
              totalCases,
              newCases,
              totalDeaths,
              newDeaths,
              totalRecovered,
              activeCases,
              seriousCritical,
              totCasesPerMilion,
              deathsPerMilion,
              totalTests,
              testsPerMilion,
              population
            });
            aux++;
            if(posicao == 225){
              aux = -1;
            }
            break;
          default:
            aux++
            if(aux == 22){
              aux = 0;
            }
        }        
        if(aux == -1) {
          return false;
        }
      })
  }).catch(console.error);
    return response.json(tabelaPaises)
  }
}

module.exports = MinerController
