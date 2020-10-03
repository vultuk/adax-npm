export const listRooms = (req) => () => {
  const results = req();

  return results['rooms'];
}

export const getRoomTarget = (req) => (roomId: number): number => {
  try {
    const results = req();
    const rooms = results['rooms'];
    const room = rooms.filter((r: any) => r.id === roomId);

    return room[0].targetTemperature / 100;
  } catch (err) {
    throw new Error("No Matching Room Found");
  }
}

export const getRoomTemperature = (req) => (roomId: number): number => {
  try {
    const results = req();
    const rooms = results['rooms'];
    const room = rooms.filter((r: any) => r.id === roomId);

    return room[0].temperature / 100;
  } catch (err) {
    throw new Error("No Matching Room Found");
  }
}


export const setRoomTemperature = (req) =>
  /**
   * Sets the temperature for a room
   * 
   * @param {number} [roomId] The ID of the room
   * 
   * @returns {boolean} If the update is successful a true boolean is returned
   */
  (roomId: number): true => {
    const results = req();
    const rooms = results['rooms'];
    const room = rooms[0];

    if (room.status === 'NoAccess') {
      throw new Error("No Matching Room Found");
    }

    return true;
  }