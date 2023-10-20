class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
    }
    receiveMessage(message) {
      const results = [];
  
      for (const command of message.commands) {
        const result = this.executeCommand(command);
        results.push(result);
      }
  
      return {
        message: message.name,
        results,
      };
    }
  
    executeCommand(command) {
      // Implement logic for different command types here
      if (command.commandType === 'MODE_CHANGE') {
         this.mode = command.value;
         return { completed: true };
       } else if (command.commandType === 'MOVE') {
         if (this.mode === 'LOW_POWER') {
           return { completed: false };
         }
         this.position = command.value;
         return { completed: true };
         
       } else if (command.commandType === 'STATUS_CHECK') {
         
         // Handle STATUS_CHECK command
         const roverStatus = {
           mode: this.mode,
           generatorWatts: this.generatorWatts,
           position: this.position,
         };
         return { completed: true, roverStatus };
       } else {
         return { completed: false };
       }
     }
  
}

module.exports = Rover;