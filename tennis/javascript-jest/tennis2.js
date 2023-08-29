'use strict'

const getScore = (p1Point, p2Point) => {
  var score = ''

  if (p1Point === p2Point && p1Point < 3) {
    if (p1Point === 0) {
      score = 'Love'
    }
    if (p1Point === 1) {
      score = 'Fifteen'
    }
    if (p1Point === 2) {
      score = 'Thirty'
    }
    score += '-All'
  }
  if (p1Point === p2Point && p1Point > 2) {
    score = 'Deuce'
  }

  var P1res
  var P2res
  if (p1Point > 0 && p2Point === 0) {
    if (p1Point === 1) {
      P1res = 'Fifteen'
    }
    if (p1Point === 2) {
      P1res = 'Thirty'
    }
    if (p1Point === 3) {
      P1res = 'Forty'
    }

    P2res = 'Love'
    score = P1res + '-' + P2res
  }
  if (p2Point > 0 && p1Point === 0) {
    if (p2Point === 1) {
      P2res = 'Fifteen'
    }
    if (p2Point === 2) {
      P2res = 'Thirty'
    }
    if (p2Point === 3) {
      P2res = 'Forty'
    }

    P1res = 'Love'
    score = P1res + '-' + P2res
  }

  if (p1Point > p2Point && p1Point < 4) {
    if (p1Point === 2) {
      P1res = 'Thirty'
    }
    if (p1Point === 3) {
      P1res = 'Forty'
    }
    if (p2Point === 1) {
      P2res = 'Fifteen'
    }
    if (p2Point === 2) {
      P2res = 'Thirty'
    }
    score = P1res + '-' + P2res
  }
  if (p2Point > p1Point && p2Point < 4) {
    if (p2Point === 2) {
      P2res = 'Thirty'
    }
    if (p2Point === 3) {
      P2res = 'Forty'
    }
    if (p1Point === 1) {
      P1res = 'Fifteen'
    }
    if (p1Point === 2) {
      P1res = 'Thirty'
    }
    score = P1res + '-' + P2res
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
