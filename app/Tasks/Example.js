'use strict'
const Scraper = require('../Functions/Scraper')

const Task = use('Task')

class Example extends Task {
  static get schedule () {
    return '*/20 * * * * *'
  }

  async handle () {
    console.log(await Scraper.fetchData())
  }
}

module.exports = Example
