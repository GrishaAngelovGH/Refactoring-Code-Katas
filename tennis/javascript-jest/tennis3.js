'use strict'

const points = ['Love', 'Fifteen', 'Thirty', 'Forty']

const determineScore = (score, p1Point, p2Point) => {
  if ((p1Point < 4 && p2Point < 4) && (p1Point + p2Point < 6)) {
    score = points[p1Point]
  }

  return (p1Point === p2Point) ? score + '-All' : score + '-' + points[p2Point]
}

const getScore = (p1Point, p2Point) => {
  let score
  let p1Name = 'player1'
  let p2Name = 'player2'

  score = determineScore(score, p1Point, p2Point)

  if (!((p1Point < 4 && p2Point < 4) && (p1Point + p2Point < 6))) {
    if (p1Point === p2Point) {
      return 'Deuce'
    }
    score = p1Point > p2Point ? p1Name : p2Name
    return ((p1Point - p2Point) * (p1Point - p2Point) === 1) ? 'Advantage ' + score : 'Win for ' + score
  }

  return score
}

module.exports = getScore
