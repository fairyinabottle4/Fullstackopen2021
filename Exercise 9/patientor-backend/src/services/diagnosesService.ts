import diagnosesData from '../../data/diagnoses'

import { Diagnosis } from '../types'

const diagnoses: Array<Diagnosis> = diagnosesData

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getDiagnoses,
  addEntry
};
