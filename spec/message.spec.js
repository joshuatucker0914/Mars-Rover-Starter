const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect(() => new Message()).toThrow(new Error('Name required.'));
      });
    
    it("constructor sets name", function() {
        const messageName = "Test Message";
        const myMessage = new Message(messageName);
        expect(myMessage.name).toBe(messageName);
      });
    
      it("contains a commands array passed into the constructor as the 2nd argument", function() {
        const messageName = "Test Message";
        const command1 = new Command('CommandType1', 'CommandValue1');
        const command2 = new Command('CommandType2', 'CommandValue2');
        const commands = [command1, command2];
    
        const myMessage = new Message(messageName, commands);
    
        // Check if the 'commands' property of the 'myMessage' object matches the 'commands' array
        expect(myMessage.commands).toEqual(commands);
      });
    

});
