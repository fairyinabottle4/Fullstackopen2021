"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const utils_1 = require("../utils");
const uuid_1 = require("uuid");
const patients = patients_1.default;
const id = uuid_1.v1();
const getPatients = () => {
    return patients.map((patient) => utils_1.censorPatient(patient));
};
const getSinglePatient = (id) => {
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        throw new Error('Patient not found');
    }
    else {
        return patient;
    }
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: id }, entry);
    patients.push(newPatient);
    return newPatient;
};
const addEntry = (patientId, entry) => {
    const patient = getSinglePatient(patientId);
    if (!patient) {
        throw new Error(`Incorrect patient id`);
    }
    patient.entries.push(entry);
    return entry;
};
exports.default = {
    getPatients,
    addPatient,
    getSinglePatient,
    addEntry
};
