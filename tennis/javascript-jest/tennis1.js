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

const advantage = {
  '1': 'Advantage player1',
  '-1': 'Advantage player2'
}

const getEqualScoreOrDeuce = score => scores[score] || 'Deuce'

const determineAdvantageOrWin = (m_score1, m_score2) => {
  const result = m_score1 - m_score2

  const determinedAdvantage = advantage[result]
  const determinedWin = result >= 2 ? 'Win for player1' : 'Win for player2'

  return determinedAdvantage || determinedWin
}

const determinePoints = (m_score1, m_score2) => {
  let score = ''
  let tempScore = m_score1

  score += points[tempScore]

  for (var i = 1; i < 2; i++) {
    score += '-'
    tempScore = m_score2

    score += points[tempScore]
  }

  return score
}

const getScore = (m_score1, m_score2) => {
  let score = ''

  if (m_score1 === m_score2) {
    score = getEqualScoreOrDeuce(m_score1)
  }

  if (m_score1 !== m_score2 && (m_score1 >= 4 || m_score2 >= 4)) {
    score = determineAdvantageOrWin(m_score1, m_score2)
  }

  if (m_score1 !== m_score2 && !(m_score1 >= 4 || m_score2 >= 4)) {
    score = determinePoints(m_score1, m_score2)
  }

  return score
}

module.exports = getScore
