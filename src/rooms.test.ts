import { getRoomTarget, getRoomTemperature, listRooms, setRoomTemperature } from './rooms'

test("Rooms -> Set Room Temperature", async() => {
  let updateRoomTemperature = setRoomTemperature(() => ({
    "rooms": [
      {
        "id": 274802,
        "status": "OK"
      }
    ]
  }));

  expect(updateRoomTemperature(274802)).resolves.toBeTruthy()

  updateRoomTemperature = setRoomTemperature(() => ({
    "rooms": [
      {
        "id": 275351,
        "status": "OK"
      }
    ]
  }));

  expect(updateRoomTemperature(275351)).resolves.toBeTruthy()

  updateRoomTemperature = setRoomTemperature(() => ({
    "rooms": [
      {
        "id": 387372,
        "status": "NoAccess"
      }
    ]
  }));

  expect(updateRoomTemperature(387372)).rejects.toEqual(new Error('No Matching Room Found'));
});

test("Rooms -> Get Room Temperature", async() => {
  const roomTemperature = getRoomTemperature(fakeGetRequest);

  expect(roomTemperature(274802)).resolves.toBe(20.78);
  expect(roomTemperature(275351)).resolves.toBe(21.41);

  expect(roomTemperature(387372)).rejects.toEqual(new Error('No Matching Room Found'));
});

test("Rooms -> Get Room Target Temperature", async() => {
  const roomTarget = getRoomTarget(fakeGetRequest);

  expect(roomTarget(274802)).resolves.toBe(21.00);
  expect(roomTarget(275351)).resolves.toBe(16.50);

  expect(roomTarget(387372)).rejects.toEqual(new Error('No Matching Room Found'));
});

test("Rooms -> List Rooms", async() => {
  const getRoomDetails = listRooms(fakeGetRequest);

  expect(getRoomDetails()).resolves.toEqual([
    {
      "id": 274802,
      "homeId": 139148,
      "name": "Hall",
      "heatingEnabled": true,
      "targetTemperature": 2100,
      "temperature": 2078
    },
    {
      "id": 275915,
      "homeId": 139148,
      "name": "Living Room",
      "heatingEnabled": true,
      "targetTemperature": 3000,
      "temperature": 1961
    },
    {
      "id": 275351,
      "homeId": 139148,
      "name": "Master Bedroom",
      "heatingEnabled": true,
      "targetTemperature": 1650,
      "temperature": 2141
    }
  ]);
});

const fakeGetRequest = () => ({
  "homes": [
    {
      "id": 139148,
      "name": "Home"
    }
  ],
  "rooms": [
    {
      "id": 274802,
      "homeId": 139148,
      "name": "Hall",
      "heatingEnabled": true,
      "targetTemperature": 2100,
      "temperature": 2078
    },
    {
      "id": 275915,
      "homeId": 139148,
      "name": "Living Room",
      "heatingEnabled": true,
      "targetTemperature": 3000,
      "temperature": 1961
    },
    {
      "id": 275351,
      "homeId": 139148,
      "name": "Master Bedroom",
      "heatingEnabled": true,
      "targetTemperature": 1650,
      "temperature": 2141
    }
  ],
  "devices": [
    {
      "id": 425492,
      "homeId": 139148,
      "roomId": 274802,
      "name": "Hall Downstairs",
      "type": "Heater"
    },
    {
      "id": 430794,
      "homeId": 139148,
      "roomId": 275915,
      "name": "Living Room Left",
      "type": "Heater"
    },
    {
      "id": 428814,
      "homeId": 139148,
      "roomId": 275915,
      "name": "Living Room Right",
      "type": "Heater"
    },
    {
      "id": 428270,
      "homeId": 139148,
      "roomId": 275351,
      "name": "Main Bedroom",
      "type": "Heater"
    }
  ]
});