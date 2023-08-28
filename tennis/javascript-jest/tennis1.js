'use strict'

const scores = {
  0: 'Love-All',
  1: 'Fifteen-All',
  2: 'Thirty-All'
}

const points = {
  0: 'Love',
  1: 'Fifteen',
  2: 'Thirty',
  3: 'Forty'
}

const getScoreOrDeuce = score => scores[score] || 'Deuce'

const calculateScoreGTE4 = (score, m_score1, m_score2) => {
  var minusResult = m_score1 - m_score2
  if (minusResult === 1) { score = 'Advantage player1' }
  else if (minusResult === -1) { score = 'Advantage player2' }
  else if (minusResult >= 2) { score = 'Win for player1' }
  else { score = 'Win for player2' }
  return score
}

const calculateScoreLT3 = (score, m_score1, m_score2, tempScore) => {
  for (var i = 1; i < 3; i++) {
    if (i === 1) { tempScore = m_score1 }
    else {
      score += '-'
      tempScore = m_score2
    }
    score += points[tempScore]
  }

  return score
}

function getScore(m_score1, m_score2) {
  let score = ''
  let tempScore = 0

  if (m_score1 === m_score2) {
    score = getScoreOrDeuce(m_score1)
  } else if (m_score1 >= 4 || m_score2 >= 4) {
    score = calculateScoreGTE4(score, m_score1, m_score2)
  } else {
    score = calculateScoreLT3(score, m_score1, m_score2, tempScore)
  }

  return score
}

module.exports = getScore
