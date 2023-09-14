const MarsRover = require('../mars-rover')

describe('Mars Rover', function () {
  test('should use default location', function () {
    const marsRover = new MarsRover()

    expect(marsRover.location).toEqual([0, 0])
  })

  test('should use default direction', function () {
    const marsRover = new MarsRover()

    expect(marsRover.direction).toEqual('N')
  })

  test('should use default grid', function () {
    const marsRover = new MarsRover()

    expect(marsRover.grid).toEqual([100, 100])
  })
})