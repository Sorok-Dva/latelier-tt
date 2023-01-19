const { validationResult } = require('express-validator')
const httpStatus = require('http-status')
const { BackError } = require(`../../helpers/back.error`)
const playersList = require('../../headtohead.json').players

const Player = {}

/**
 * Sort players list
 * @param req
 * @param res
 * @param next
 * @returns res.json
 */
Player.List = async (req, res, next) => {
  try {
    const list = playersList.sort((a, b) => a.data.rank - b.data.rank)

    return res.status(200).json(list)
  } catch (error) {
    next(new BackError(error))
  }
}

/**
 * Retrieve players by ID
 * @param req
 * @param res
 * @param next
 * @returns res.json
 */
Player.Get = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).send({ params: req.params, errors: errors.array() });
    }

    const { id } = req.params
    const player = playersList.find(player => player.id === Number(id))

    if (!player) return res.status(404).json({ error: `Player ${id} not found` })
    return res.status(200).json(player)
  } catch (error) {
    next(new BackError(error))
  }
}

/**
 * Retrieve players stats
 * @param req
 * @param res
 * @param next
 * @returns res.json
 */
Player.Stats = async (req, res, next) => {
  try {
    const ratioPerCountry = {
      USA: 0,
      SRB: 0,
      SUI: 0,
      ESP: 0
    }

    playersList.forEach(player => {
      const victory = player.data.last.filter(r => r === 1)
      const defeats = player.data.last.filter(r => r === 0)
      const ratio = victory.length / (defeats.length === 0 ? 1 : defeats.length)

      ratioPerCountry[player.country.code] += ratio
    })

    const calculateBMI = (group) => {
      let totalBMI = 0;
      for (let i = 0; i < group.length; i++) {
        let person = group[i];
        let bmi = person.weight / (person.height * person.height);
        totalBMI += bmi;
      }
      return totalBMI / group.length;
    }

    let group = playersList.map(player => {
      return {
        weight: Number(String(player.data.weight).slice(0, -3)),
        height: Number(player.data.height.toString().replace(/\B(?=(\d{2})+(?!\d))/g, '.'))
      }
    })

    let averageBMI = calculateBMI(group);

    const calculateMedianHeight = (players) => {
      players.sort((a, b) => a.height - b.height);
      let median;
      // si le nombre de joueurs est pair
      if (players.length % 2 === 0) {
        // trouver les deux éléments du milieu
        let mid = players.length / 2;
        median = (players[mid - 1].height + players[mid].height) / 2;
      } else {
        // trouver l'élément du milieu
        median = players[Math.floor(players.length / 2)].height;
      }
      return median;
    }

    let players = playersList.map(player => {
      return {
        height: Number(player.data.height.toString().replace(/\B(?=(\d{2})+(?!\d))/g, '.'))
      }
    })

    let medianHeight = calculateMedianHeight(players);

    return res.status(200).json({
      ratio: ratioPerCountry,
      bmi: averageBMI,
      median: medianHeight,
    })
  } catch (error) {
    next(new BackError(error))
  }
}

module.exports = Player
