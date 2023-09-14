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

  test('should use default obstacles', function () {
    const marsRover = new MarsRover()

    expect(marsRover.obstacles).toEqual([])
  })

  test('should use default status', function () {
    const marsRover = new MarsRover()

    expect(marsRover.status).toEqual('OK')
  })

  test('should move forward', function () {
    const marsRover = new MarsRover()

    marsRover.commands(['f'])

    expect(marsRover.location).toEqual([0, 99])
  })

  test('should move backward', function () {
    const marsRover = new MarsRover()

    marsRover.commands(['b'])

    expect(marsRover.location).toEqual([0, 1])
  })

  test('should move left', function () {
    const marsRover = new MarsRover()

    marsRover.commands(['l'])

    expect(marsRover.location).toEqual([0, 0])
  })
})