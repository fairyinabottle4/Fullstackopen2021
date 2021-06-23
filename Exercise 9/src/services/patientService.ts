import patientData from '../../data/patients'
import { censorPatient } from "../utils";
import {v1 as uuid} from 'uuid'
import { Patient, CensoredPatient, NewPatientEntry } from '../types'
import { Entry } from '../types'

const patients: Array<Patient> = patientData

const id = uuid()

const getPatients = (): CensoredPatient[] => {
  return patients.map((patient) => censorPatient(patient));
}

const getSinglePatient = (id: string): Patient => {
  const patient = patients.find(p => p.id === id)
  if (!patient) {
    throw new Error('Patient not found')
  } else {
    return patient
  }
}

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatient = {
    id: id,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
}

const addEntry = (patientId: string, entry: Entry): Entry => {

  const patient: Patient | undefined = getSinglePatient(patientId);
  if (!patient) {
    throw new Error(`Incorrect patient id`);
  }

  patient.entries.push(entry);

  return entry;
};


export default {
  getPatients,
  addPatient,
  getSinglePatient,
  addEntry
}