function MarsRover(location, direction, grid, obstacles) {

  self = this;
  this.location = (location === undefined) ? [0, 0] : location;
  this.direction = (direction === undefined) ? 'N' : direction;
  this.grid = (grid === undefined) ? [100, 100] : grid;
  this.obstacles = (obstacles === undefined) ? [] : obstacles;
  this.status = 'OK';

  this.commands = function (commands) {
    if (commands === undefined) { // Getter
      return this.commandsArray;
    } else { // Setter
      for (var index = 0; index < commands.length; index++) {
        var command = commands[index];
        if (command === 'f' || command === 'b') {
          if (!move(command)) break;
        } else if (command === 'l' || command === 'r') {
          turn(command);
        }
      }
      resetLocation();
      this.commandsArray = commands;
    }
  };

  function resetLocation() {
    self.location = [
      (self.location[0] + self.grid[0]) % self.grid[0],
      (self.location[1] + self.grid[1]) % self.grid[1]
    ]
  }

  function move(command) {
    var xIncrease = 0, yIncrease = 0;
    if (self.direction === 'N') {
      yIncrease = -1;
    } else if (self.direction === 'E') { // East
      xIncrease = 1;
    } else if (self.direction === 'S') { // South
      yIncrease = 1;
    } else if (self.direction === 'W') { // West
      xIncrease = -1;
    }
    if (command === 'b') { // Backward
      xIncrease *= -1;
      yIncrease *= -1;
    }
    var newLocation = [self.location[0] + xIncrease, self.location[1] + yIncrease];
    if (isObstacle(newLocation)) {
      return false;
    }
    self.location = newLocation;
    return true;
  }

  function isObstacle(newLocation) {
    for (var index = 0; index < self.obstacles.length; index++) {
      if (newLocation.toString() == self.obstacles[index].toString()) {
        self.status = 'obstacle';
        return true;
      }
    }
    return false;
  }

  function turn(command) {
    var directionNumber = directionAsNumber(self.direction);
    if (command === 'l') { // Left
      directionNumber = (directionNumber + 4 - 1) % 4;
    } else { // Right
      directionNumber = (directionNumber + 1) % 4;
    }
    self.direction = self.directions[directionNumber];
  }

  this.directions = ['N', 'E', 'S', 'W'];

  function directionAsNumber(direction) {
    for (var index = 0; index < 4; index++) {
      if (self.directions[index] === direction) return index;
    }
  }

}

module.exports = MarsRover