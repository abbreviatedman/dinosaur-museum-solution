/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let dinosaur = null;
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].name === dinosaurName) {
      dinosaur = dinosaurs[i]
    }
  }

  if (dinosaur === null) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }

  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].dinosaurs.includes(dinosaur.dinosaurId)) {
      return rooms[i].name;
    }
  }

  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
}

/**
 * getDinosaurByName()
 * ---------------------
 * Return the dinosaur object with the given name. If the dinosaur cannot be found, return null.
 * @param {Object[]} dinosaurs - An array of dinosaurs.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {(Object|null)} The found dinosaur or null.
 */
function getDinosaurByName(dinosaurs, name) {
  let dinosaur = null;
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].name === name) {
      dinosaur = dinosaurs[i];
    }
  }

  return dinosaur;
}

// Alternate version that uses the helper function `getDinosaurByName` above.
function getRoomByDinosaurNameAlt(dinosaurs, rooms, dinosaurName) {
  const dinosaur = getDinosaurByName(dinosaurs, dinosaurName)
  if (dinosaur === null) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }

  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].dinosaurs.includes(dinosaur.dinosaurId)) {
      return rooms[i].name;
    }
  }

  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
}
/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "aIA6tevTne");
 *  //> ["Ticket Center"]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "A6QaYdyKra");
 *  //> [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing"
    ]
 */
function getConnectedRoomNamesById(rooms, id) {
  const result = [];
  let room = null;
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].roomId === id) {
      room = rooms[i];
    }
  }

  if (room === null) {
    return `Room with ID of '${id}' could not be found.`
  }

  for (let i = 0; i < room.connectsTo.length; i++) {
    let connectedRoom = null;
    for (let j = 0; j < rooms.length; j++) {
      if (rooms[j].roomId === room.connectsTo[i]) {
        connectedRoom = rooms[j];
      }
    }

    if (connectedRoom === null) {
      return `Room with ID of 'incorrect-id' could not be found.`
    }

    result.push(connectedRoom.name)
  }

  return result;
}

/**
 * getRoomById()
 * ---------------------
 * Returns the room object from the given rooms list that matches the given room id, or null if no room is found.
 * @param {Object[]} rooms - A list of rooms to search.
 * @param {string} id - The id of the room to search for.
 * @returns {(Object|null)} The found room, or null if none are found.
 */
function getRoomById(rooms, id) {
  let found = null;
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].roomId === id) {
      found = rooms[i];
    }
  }

  return found;
}

// Alternate version that uses the helper function `getRoomById` above.
function getConnectedRoomNamesByIdAlt(rooms, id) {
  const result = [];
  const room = getRoomById(rooms, id);
  if (room === null) {
    return `Room with ID of '${id}' could not be found.`
  }

  for (let i = 0; i < room.connectsTo.length; i++) {
    const connectedRoom = getRoomById(rooms, room.connectsTo[i])
    if (connectedRoom === null) {
      return `Room with ID of 'incorrect-id' could not be found.`
    }

    result.push(connectedRoom.name)
  }

  return result;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
