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
    let [xIncrease, yIncrease] = this.coordinates[this.direction]

    if (command === 'b') { // Backward
      xIncrease *= -1
      yIncrease *= -1
    }
    var newLocation = [this.location[0] + xIncrease, this.location[1] + yIncrease]
    if (this.isObstacle(newLocation)) {
      return false
    }
    this.location = newLocation
    return true
  }

  isObstacle(newLocation) {
    for (var index = 0; index < this.obstacles.length; index++) {
      if (newLocation.toString() == this.obstacles[index].toString()) {
        this.status = 'obstacle'
        return true
      }
    }
    return false
  }

  turn(command) {
    var directionNumber = this.directionAsNumber(this.direction)
    if (command === 'l') { // Left
      directionNumber = (directionNumber + 4 - 1) % 4
    } else { // Right
      directionNumber = (directionNumber + 1) % 4
    }
    this.direction = this.directions[directionNumber]
  }

  directionAsNumber(direction) {
    for (var index = 0; index < 4; index++) {
      if (this.directions[index] === direction) return index
    }
  }

}

module.exports = { MarsRover, NoCommandsFoundError }