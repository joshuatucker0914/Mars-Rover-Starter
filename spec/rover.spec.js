const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function() {
    const position = 0; // Example position
    const rover = new Rover(position);

    expect(rover.position).toBe(position);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });
  // Test 8
  it("response returned by receiveMessage contains the name of the message", function() {
    const rover = new Rover(0);
    const message = new Message("Test Message", []);

    const result = rover.receiveMessage(message);

    expect(result.message).toBe("Test Message");
  });
  // Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    const rover = new Rover(0);
    const commands = [
      { commandType: 'MODE_CHANGE', value: 'LOW_POWER' },
      { commandType: 'MOVE', value: 1 }
    ];
    const message = new Message("Test Message", commands);

    const result = rover.receiveMessage(message);

    expect(result.results.length).toBe(2);
  });

  // Test 10
  it("responds correctly to the status check command", function() {
    // Created a Rover instance with an initial position and mode
    const initialPosition = 0;
    const rover = new Rover(initialPosition);

    // Created a STATUS_CHECK command
    const statusCheckCommand = { commandType: 'STATUS_CHECK' };

    // Created a message with the STATUS_CHECK command
    const message = new Message("Status Check Message", [statusCheckCommand]);

    // Receive the message and get the results
    const result = rover.receiveMessage(message);

    // Expected rover status
    const expectedRoverStatus = {
      mode: 'NORMAL',
      generatorWatts: 110,
      position: initialPosition,
    };

    expect(result.results.length).toBe(1);
    expect(result.results[0].completed).toBe(true);
    expect(result.results[0].roverStatus).toEqual(expectedRoverStatus);
  });

  // Test 11
  it("responds correctly to the mode change command", function() {
    // Created a Rover instance with an initial mode
    const initialMode = 'NORMAL';
    const rover = new Rover(0);
    rover.mode = initialMode;

    // Created a MODE_CHANGE command to change the mode to 'LOW_POWER'
    const modeChangeCommand = { commandType: 'MODE_CHANGE', value: 'LOW_POWER' };

    // Created a message with the MODE_CHANGE command
    const message = new Message("Mode Change Message", [modeChangeCommand]);

    // Receive the message and get the results
    const result = rover.receiveMessage(message);

    // Expect the rover's mode to be changed to 'LOW_POWER'
    expect(result.results.length).toBe(1);
    expect(result.results[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER');
  });

  // Test 12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    // Created a Rover instance with an initial position and LOW_POWER mode
    const initialPosition = 0;
    const rover = new Rover(initialPosition);
    rover.mode = 'LOW_POWER';

    // Created a MOVE command
    const moveCommand = { commandType: 'MOVE', value: 1 };

    // Created a message with the MOVE command
    const message = new Message("Move in LOW_POWER Message", [moveCommand]);

    // Receive the message and get the results
    const result = rover.receiveMessage(message);

    // Expect the completed property to be false
    // Expect the rover's position not to change
    expect(result.results.length).toBe(1);
    expect(result.results[0].completed).toBe(false);
    expect(rover.position).toBe(initialPosition);
  });
  // Test 13
  it("responds with the position for the move command", function() {
    // Created a Rover instance with an initial position
    const initialPosition = 0;
    const rover = new Rover(initialPosition);
    rover.mode = 'NORMAL';

    // Created a MOVE command with a position value
    const newPosition = 55; // Example position value
    const moveCommand = { commandType: 'MOVE', value: newPosition };

    // Created a message with the MOVE command
    const message = new Message("Move Message", [moveCommand]);

    // Receive the message and get the results
    const result = rover.receiveMessage(message);

    // Expect the completed property to be true
    // Expect the rover's position to be updated to the new position
    expect(result.results.length).toBe(1);
    expect(result.results[0].completed).toBe(true);
    expect(rover.position).toBe(newPosition);
  });
});
