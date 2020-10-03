import { listRooms, getRoomTemperature, getRoomTarget, setRoomTemperature } from './rooms'

test("Rooms -> Set Room Temperature", () => {
  let updateRoomTemperature = setRoomTemperature(() => ({
    "rooms": [
      {
        "id": 274802,
        "status": "OK"
      }
    ]
  }));

  expect(updateRoomTemperature(274802)).toBeTruthy()

  updateRoomTemperature = setRoomTemperature(() => ({
    "rooms": [
      {
        "id": 275351,
        "status": "OK"
      }
    ]
  }));

  expect(updateRoomTemperature(275351)).toBeTruthy()

  updateRoomTemperature = setRoomTemperature(() => ({
    "rooms": [
      {
        "id": 387372,
        "status": "NoAccess"
      }
    ]
  }));

  expect(() => updateRoomTemperature(387372)).toThrowError('No Matching Room Found');
});

test("Rooms -> Get Room Temperature", () => {
  const roomTemperature = getRoomTemperature(fakeGetRequest);

  expect(roomTemperature(274802)).toBe(20.78);
  expect(roomTemperature(275351)).toBe(21.41);

  expect(() => roomTemperature(387372)).toThrowError('No Matching Room Found');
});

test("Rooms -> Get Room Target Temperature", () => {
  const roomTarget = getRoomTarget(fakeGetRequest);

  expect(roomTarget(274802)).toBe(21.00);
  expect(roomTarget(275351)).toBe(16.50);

  expect(() => roomTarget(387372)).toThrowError('No Matching Room Found');
});

test("Rooms -> List Rooms", () => {
  const getRoomDetails = listRooms(fakeGetRequest);

  expect(getRoomDetails()).toEqual([
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