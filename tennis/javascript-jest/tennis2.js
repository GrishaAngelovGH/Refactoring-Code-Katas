'use strict'

const scores = {
  0: 'Love',
  1: 'Fifteen',
  2: 'Thirty',
  3: 'Forty'
}

const determineEqualScoreOrDeuce = (score, point) => {
  if (point < 3) {
    score = scores[point]
    score += '-All'
  }

  if (point > 2) {
    score = 'Deuce'
  }

  return score
}

const getScore = (p1Point, p2Point) => {
  let score = ''

  score = p1Point === p2Point && determineEqualScoreOrDeuce(score, p1Point)

  let p1Res
  let p2Res

  if (p1Point > 0 && p2Point === 0) {
    p1Res = scores[p1Point]

    p2Res = 'Love'
    score = p1Res + '-' + p2Res
  }

  if (p2Point > 0 && p1Point === 0) {
    p2Res = scores[p2Point]

    p1Res = 'Love'
    score = p1Res + '-' + p2Res
  }

  if (p1Point > p2Point && p1Point < 4) {
    p1Res = scores[p1Point]
    p2Res = scores[p2Point]

    score = p1Res + '-' + p2Res
  }

  if (p2Point > p1Point && p2Point < 4) {
    p1Res = scores[p1Point]
    p2Res = scores[p2Point]

    score = p1Res + '-' + p2Res
  }

  if (p1Point > p2Point && p2Point >= 3) {
    score = 'Advantage player1'
  }

  if (p2Point > p1Point && p1Point >= 3) {
    score = 'Advantage player2'
  }

  if (p1Point >= 4 && p2Point >= 0 && (p1Point - p2Point) >= 2) {
    score = 'Win for player1'
  }

  if (p2Point >= 4 && p1Point >= 0 && (p2Point - p1Point) >= 2) {
    score = 'Win for player2'
  }

  return score
}

module.exports = getScore
