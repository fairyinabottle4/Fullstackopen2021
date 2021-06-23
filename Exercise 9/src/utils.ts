import {
  Patient,
  CensoredPatient,
  NewPatientEntry,
  Gender,
  BaseEntry,
  HealthCheckRating,
  Entry,
  Diagnosis
} from './types'

import { v4 as uuid } from 'uuid';

export const censorPatient = ({
  id,
  name,
  dateOfBirth,
  gender,
  occupation,
  entries
}: Patient): CensoredPatient => {
  return { id, name, dateOfBirth, gender, occupation, entries };
};

type Fields = {name: unknown, ssn: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown}

export const toNewPatientEntry = ({name, ssn, dateOfBirth, gender, occupation} : Fields): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseString(name, "name"),
    ssn: parseString(ssn, "ssn"),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseString(occupation, "occupation"),
    entries: []
  };

  return newPatient;
}

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: any, field: string): string => {
  if (!text || !isString(text) || text.trim() === "") {
    throw new Error(`Invalid or missing ${field}`);
  }
  return text.trim();
};
  
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Invalid or missing gender`);
  }
  return gender;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Invalid or missing date of birth`);
  }
  return date.trim();
};

const parseArrayStringCodes = (data: any): Array<Diagnosis['code']> => {

  if (!data) {
    return [];
  }

  const codes: Array<Diagnosis['code']> = [];
  const error = '"diagnosisCodes" is an array of codes as string';

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dataCodes: Array<Diagnosis['code']> = typeof data === 'object' ? data : JSON.parse(data);
    if (!Array.isArray(dataCodes)) throw new Error(error);
    dataCodes.forEach((code) => {
      if (!isString(code)) {
        throw new Error(error);
      }
      codes.push(code);
    });

  } catch (error) {
    throw new Error(error);
  }

  return codes
};

const isRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: any): HealthCheckRating => {
  if (!rating) {
    throw new Error(`Missing rating`);
  }
  const ratingNumber: number = parseInt(rating);
  if (isNaN(ratingNumber) || !isRating(ratingNumber)) {
    throw new Error(`Incorrect rating number: ${Object.values(HealthCheckRating).join(' | ')}`);
  }
  return ratingNumber;
};

export const toNewEntry = (object: any): Entry => {
  const baseEntry: BaseEntry = {
    id: uuid(),
    description: parseString(object.description, "description"),
    date: parseDateOfBirth(object.date),
    specialist: parseString(object.specialist, "specialist"),
    diagnosisCodes: parseArrayStringCodes(object.diagnosisCodes),
  };
  if (!object.type || !isString(object.type)) {
    throw new Error(`Missing or invalid entry type`);
  }
  switch (object.type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseRating(object.healthCheckRating)
      };

    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: {
          date: parseDateOfBirth(object.dischargeDate),
          criteria: parseString('dischargeCriteria', object.dischargeCriteria)
        }
      };

    case 'OccupationalHealthcare':
      let sickLeave;
      if (object.sickLeaveStartDate && object.sickLeaveEndDate) {
        sickLeave = {
          startDate: parseDateOfBirth(object.sickLeaveStartDate),
          endDate: parseDateOfBirth(object.sickLeaveEndDate)
        };
      }
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString('employerName', object.employerName),
        sickLeave
      };

    default:
      throw new Error(`Incorrect entry type`);
  }
}; 

