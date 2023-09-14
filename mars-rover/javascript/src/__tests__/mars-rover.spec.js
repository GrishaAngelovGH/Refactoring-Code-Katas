const { MarsRover, NoCommandsFoundError } = require('../mars-rover')


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

  test('should throw an error when commands are not provided', function () {
    const marsRover = new MarsRover()

    expect(
      () => { marsRover.commands() }
    ).toThrow('Commands not found!')
  })

  test('should move forward', function () {
    const marsRover = new MarsRover()

    marsRover.commands(['f'])

    expect(marsRover.location).toEqual([0, 99])
    expect(marsRover.direction).toEqual('N')
  })

  test('should move backward by y axis', function () {
    const marsRover = new MarsRover()

    marsRover.commands(['b'])

    expect(marsRover.location).toEqual([0, 1])
    expect(marsRover.direction).toEqual('N')
  })

  test('should move backward by x axis', function () {
    const marsRover = new MarsRover()

    marsRover.commands(['l', 'f', 'b', 'b', 'b'])

    expect(marsRover.location).toEqual([2, 0])
    expect(marsRover.direction).toEqual('W')
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

  test('should turn and move West', function () {
    const marsRover = new MarsRover()

    marsRover.commands(['l', 'f'])

    expect(marsRover.location).toEqual([99, 0])
    expect(marsRover.direction).toEqual('W')
  })

  test('should face obstacle', function () {
    const marsRover = new MarsRover([1, 1], 'N', [3, 3], [[2, 1]])

    marsRover.commands(['r', 'f'])

    expect(marsRover.status).toEqual('obstacle')
  })
})