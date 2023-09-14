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
    expect(marsRover.direction).toEqual('N')
  })

  test('should move backward', function () {
    const marsRover = new MarsRover()

    marsRover.commands(['b'])

    expect(marsRover.location).toEqual([0, 1])
    expect(marsRover.direction).toEqual('N')
  })

  test('should turn left', function () {
    const marsRover = new MarsRover()

    marsRover.commands(['l'])

    expect(marsRover.location).toEqual([0, 0])
    expect(marsRover.direction).toEqual('W')
  })

  test('should turn right', function () {
    const marsRover = new MarsRover()

    marsRover.commands(['r'])

    expect(marsRover.location).toEqual([0, 0])
    expect(marsRover.direction).toEqual('E')
  })

  test('should turn and move East', function () {
    const marsRover = new MarsRover()

    marsRover.commands(['r', 'f', 'f'])

    expect(marsRover.location).toEqual([2, 0])
    expect(marsRover.direction).toEqual('E')
  })

  test('should turn and move South', function () {
    const marsRover = new MarsRover()

    marsRover.commands(['r', 'r', 'f'])

    expect(marsRover.location).toEqual([0, 1])
    expect(marsRover.direction).toEqual('S')
  })
})