import { faker } from "@faker-js/faker";
import { ICD_CODE } from "./constants/icdCode";

interface Diagnosis {
  icdCode: string;
  timestamp: Date;
}

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "MALE" | "FEMALE" | "NON-BINARY";
  phoneNumber: number;
  patientNotes: string | null;
  diagnoses: Diagnosis[];
}

function makeDiagnosis(numDiagnoses: number): Diagnosis[] {
  const result: Diagnosis[] = [];

  for (let i = 0; i < numDiagnoses; i++) {
    result.push({
      icdCode: faker.helpers.arrayElement(ICD_CODE),
      timestamp: faker.date.recent({ days: 365 }),
    });
  }

  return result.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

function makeParticipants(numParticipants: number): Participant[] {
  const result: Participant[] = [];

  for (let i = 0; i < numParticipants; i++) {
    result.push({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: faker.date.past({
        years: 10,
        refDate: new Date(1950, 0, 1),
      }),
      gender: faker.helpers.arrayElement(["MALE", "FEMALE", "NON-BINARY"]),
      phoneNumber: faker.number.int({ min: 1000000000, max: 9999999999 }),
      patientNotes: faker.helpers.arrayElement([faker.lorem.text(), null]),
      diagnoses: makeDiagnosis(faker.number.int({ min: 1, max: 10 })),
    });
  }

  return result;
}

const participants: Participant[] = makeParticipants(200);

export { participants };
