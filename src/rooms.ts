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

export const setRoomTemperature = (req) => (roomId: number): boolean => {
  const results = req();
  const rooms = results['rooms'];
  const room = rooms[0];

  if (room.status === 'NoAccess') {
    throw new Error("No Matching Room Found");
  }

  return true;
}