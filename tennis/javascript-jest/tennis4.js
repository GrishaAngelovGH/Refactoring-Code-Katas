'use strict'

class TennisGame {
  constructor(player1, player2) {
    this.server = player1
    this.receiver = player2
    this.serverScore = 0
    this.receiverScore = 0
  }

  getScore(serverScore, receiverScore) {
    this.serverScore = serverScore
    this.receiverScore = receiverScore

    const result = new Deuce(
      this, new Player(
        this, new Player(
          this, new AdvantagePlayer(
            this, new AdvantagePlayer(
              this, new DefaultResult(this)))))
    ).getResult()

    return result.format()
  }

  receiverHasAdvantage() {
    return this.receiverScore >= 4 && (this.receiverScore - this.serverScore) === 1
  }

  serverHasAdvantage() {
    return this.serverScore >= 4 && (this.serverScore - this.receiverScore) === 1
  }

  receiverHasWon() {
    return this.receiverScore >= 4 && (this.receiverScore - this.serverScore) >= 2
  }

  serverHasWon() {
    return this.serverScore >= 4 && (this.serverScore - this.receiverScore) >= 2
  }

  isDeuce() {
    return this.serverScore >= 3 && this.receiverScore >= 3 && (this.serverScore === this.receiverScore)
  }
}

class TennisResult {
  constructor(serverScore, receiverScore) {
    this.serverScore = serverScore
    this.receiverScore = receiverScore
  }

  format() {
    if (!this.receiverScore) {
      return this.serverScore
    }

    return this.serverScore === this.receiverScore ? `${this.serverScore}-All` : `${this.serverScore}-${this.receiverScore}`
  }
}

class Deuce {
  constructor(game, nextResult) {
    this.game = game
    this.nextResult = nextResult
  }

  getResult() {
    if (this.game.isDeuce()) {
      return new TennisResult('Deuce', '')
    }

    return this.nextResult.getResult()
  }
}

class Player {
  constructor(game, nextResult) {
    this.game = game
    this.nextResult = nextResult
  }

  getResult() {
    if (this.game.serverHasWon()) {
      return new TennisResult(`Win for ${this.game.server}`, '')
    }

    if (this.game.receiverHasWon()) {
      return new TennisResult(`Win for ${this.game.receiver}`, '')
    }

    return this.nextResult.getResult()
  }
}

class AdvantagePlayer {
  constructor(game, nextResult) {
    this.game = game
    this.nextResult = nextResult
  }

  getResult() {
    if (this.game.serverHasAdvantage()) {
      return new TennisResult(`Advantage ${this.game.server}`, '')
    }

    if (this.game.receiverHasAdvantage()) {
      return new TennisResult(`Advantage ${this.game.receiver}`, '')
    }

    return this.nextResult.getResult()
  }
}

class DefaultResult {
  constructor(game) {
    this.scores = ['Love', 'Fifteen', 'Thirty', 'Forty']
    this.game = game
  }

  getResult() {
    return new TennisResult(this.scores[this.game.serverScore], this.scores[this.game.receiverScore])
  }
}


const getScore = (serverScore, receiverScore) => {
  const game = new TennisGame('player1', 'player2')
  return game.getScore(serverScore, receiverScore)
}

module.exports = getScore