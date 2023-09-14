class MarsRover {
  constructor(location, direction, grid, obstacles) {
    this.location = (location === undefined) ? [0, 0] : location
    this.direction = (direction === undefined) ? 'N' : direction
    this.grid = (grid === undefined) ? [100, 100] : grid
    this.obstacles = (obstacles === undefined) ? [] : obstacles
    this.status = 'OK'
    this.directions = ['N', 'E', 'S', 'W']
  }

  commands(commands) {
    if (commands === undefined) { // Getter
      return this.commandsArray
    } else { // Setter
      for (var index = 0; index < commands.length; index++) {
        var command = commands[index]
        if (command === 'f' || command === 'b') {
          if (!this.move(command)) break
        } else if (command === 'l' || command === 'r') {
          this.turn(command)
        }
      }
      this.resetLocation()
      this.commandsArray = commands
    }
  }

  resetLocation() {
    this.location = [
      (this.location[0] + this.grid[0]) % this.grid[0],
      (this.location[1] + this.grid[1]) % this.grid[1]
    ]
  }

  move(command) {
    var xIncrease = 0, yIncrease = 0
    if (this.direction === 'N') {
      yIncrease = -1
    } else if (this.direction === 'E') { // East
      xIncrease = 1
    } else if (this.direction === 'S') { // South
      yIncrease = 1
    } else if (this.direction === 'W') { // West
      xIncrease = -1
    }
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

module.exports = MarsRover