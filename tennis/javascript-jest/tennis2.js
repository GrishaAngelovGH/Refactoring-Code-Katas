'use strict'

const scores = {
  0: 'Love',
  1: 'Fifteen',
  2: 'Thirty',
  3: 'Forty'
}

const determineEqualScoreOrDeuce = point => {
  let score = 'Deuce'

  if (point < 3) {
    score = scores[point]
    score += '-All'
  }

  return score
}

const determinePoints = (score, p1Point, p2Point) => {
  if (
    (p1Point > 0 || p2Point > 0) && (p1Point === 0 || p2Point === 0) ||
    (p1Point > p2Point && p1Point < 4) || (p2Point > p1Point && p2Point < 4)
  ) {
    score = `${scores[p1Point]}-${scores[p2Point]}`
  }

  return score
}

const determineAdvantage = (score, p1Point, p2Point) => {
  if (p1Point > p2Point && p2Point >= 3) {
    score = 'Advantage player1'
  }

  if (p2Point > p1Point && p1Point >= 3) {
    score = 'Advantage player2'
  }

  return score
}

const determineWin = (score, p1Point, p2Point) => {
  if (p1Point >= 4 && p2Point >= 0 && (p1Point - p2Point) >= 2) {
    score = 'Win for player1'
  }

  if (p2Point >= 4 && p1Point >= 0 && (p2Point - p1Point) >= 2) {
    score = 'Win for player2'
  }

  return score
}

const getScore = (p1Point, p2Point) => {
  let score = ''

  score = p1Point === p2Point && determineEqualScoreOrDeuce(p1Point)
  score = determinePoints(score, p1Point, p2Point)
  score = determineAdvantage(score, p1Point, p2Point)
  score = determineWin(score, p1Point, p2Point)

  return score
}

module.exports = getScore
