import express from 'express'
import patientService from '../services/patientService'
import { toNewEntry, toNewPatientEntry } from '../utils'
import { Entry } from '../types'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/:id/entries', (req, res) => {
  const { id } = req.params;
  try {
    const newEntry: Entry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Undefined error';
    res.status(400).send(errorMessage);
  }
});

router.post('/', (req, res) => {
  try {
    //toNewPatientEntry serves as a validation for the input
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message)
  }
})

router.get('/:id', (req, res) => {
  try {
    const patient = patientService.getSinglePatient(req.params.id)
    res.json(patient)
  } catch (e) {
    res.status(400).send(e.message)
  }
})


  
export default router;