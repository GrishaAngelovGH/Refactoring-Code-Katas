class NoCommandsFoundError extends Error { }

class MarsRover {
  constructor(location = [0, 0], direction = 'N', grid = [100, 100], obstacles = []) {
    this.location = location
    this.direction = direction
    this.grid = grid
    this.obstacles = obstacles
    this.status = 'OK'
    this.directions = ['N', 'E', 'S', 'W']
    this.commandActions = {
      'f': command => {
        if (!this.move(command)) this.resetLocation()
      },
      'b': command => {
        if (!this.move(command)) this.resetLocation()
      },
      'l': command => {
        this.turn(command)
      },
      'r': command => {
        this.turn(command)
      }
    }
    this.coordinates = {
      'N': [0, -1],
      'E': [1, 0],
      'S': [0, 1],
      'W': [-1, 0]
    }
  }

  calculateNewLocation(xIncrease, yIncrease, command) {
    if (command === 'b') {
      xIncrease *= -1
      yIncrease *= -1
    }

    return [this.location[0] + xIncrease, this.location[1] + yIncrease]
  }

  chooseDirection(command) {
    const currentDirectionIndex = this.directions.indexOf(this.direction)
    const newDirectionIndex = command === 'l' ? (currentDirectionIndex + 4 - 1) % 4 : (currentDirectionIndex + 1) % 4
    return this.directions[newDirectionIndex]
  }

  commands(commands) {
    if (!commands) throw new NoCommandsFoundError('Commands not found!')

    commands.forEach(command => {
      this.commandActions[command](command)
    })

    this.resetLocation()
  }

  resetLocation() {
    this.location = [
      (this.location[0] + this.grid[0]) % this.grid[0],
      (this.location[1] + this.grid[1]) % this.grid[1]
    ]
  }

  move(command) {
    const [xIncrease, yIncrease] = this.coordinates[this.direction]
    const newLocation = this.calculateNewLocation(xIncrease, yIncrease, command)

    if (this.isObstacle(newLocation)) return false

    this.location = newLocation
    return true
  }

  isObstacle(newLocation) {
    for (let i = 0; i < this.obstacles.length; i++) {
      if (newLocation.toString() === this.obstacles[i].toString()) {
        this.status = 'obstacle'
        return true
      }
    }
    return false
  }

  turn(command) {
    this.direction = this.chooseDirection(command)
  }
}

module.exports = { MarsRover, NoCommandsFoundError }