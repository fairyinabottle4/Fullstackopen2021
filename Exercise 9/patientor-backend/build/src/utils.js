"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatientEntry = exports.censorPatient = void 0;
const types_1 = require("./types");
const uuid_1 = require("uuid");
const censorPatient = ({ id, name, dateOfBirth, gender, occupation, entries }) => {
    return { id, name, dateOfBirth, gender, occupation, entries };
};
exports.censorPatient = censorPatient;
const toNewPatientEntry = ({ name, ssn, dateOfBirth, gender, occupation }) => {
    const newPatient = {
        name: parseString(name, "name"),
        ssn: parseString(ssn, "ssn"),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseString(occupation, "occupation"),
        entries: []
    };
    return newPatient;
};
exports.toNewPatientEntry = toNewPatientEntry;
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseString = (text, field) => {
    if (!text || !isString(text) || text.trim() === "") {
        throw new Error(`Invalid or missing ${field}`);
    }
    return text.trim();
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`Invalid or missing gender`);
    }
    return gender;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDateOfBirth = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Invalid or missing date of birth`);
    }
    return date.trim();
};
const parseArrayStringCodes = (data) => {
    if (!data) {
        return [];
    }
    const codes = [];
    const error = '"diagnosisCodes" is an array of codes as string';
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const dataCodes = typeof data === 'object' ? data : JSON.parse(data);
        if (!Array.isArray(dataCodes))
            throw new Error(error);
        dataCodes.forEach((code) => {
            if (!isString(code)) {
                throw new Error(error);
            }
            codes.push(code);
        });
    }
    catch (error) {
        throw new Error(error);
    }
    return codes;
};
const isRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseRating = (rating) => {
    if (!rating) {
        throw new Error(`Missing rating`);
    }
    const ratingNumber = parseInt(rating);
    if (isNaN(ratingNumber) || !isRating(ratingNumber)) {
        throw new Error(`Incorrect rating number: ${Object.values(types_1.HealthCheckRating).join(' | ')}`);
    }
    return ratingNumber;
};
const toNewEntry = (object) => {
    const baseEntry = {
        id: uuid_1.v4(),
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
            return Object.assign(Object.assign({}, baseEntry), { type: 'HealthCheck', healthCheckRating: parseRating(object.healthCheckRating) });
        case 'Hospital':
            return Object.assign(Object.assign({}, baseEntry), { type: 'Hospital', discharge: {
                    date: parseDateOfBirth(object.dischargeDate),
                    criteria: parseString('dischargeCriteria', object.dischargeCriteria)
                } });
        case 'OccupationalHealthcare':
            let sickLeave;
            if (object.sickLeaveStartDate && object.sickLeaveEndDate) {
                sickLeave = {
                    startDate: parseDateOfBirth(object.sickLeaveStartDate),
                    endDate: parseDateOfBirth(object.sickLeaveEndDate)
                };
            }
            return Object.assign(Object.assign({}, baseEntry), { type: 'OccupationalHealthcare', employerName: parseString('employerName', object.employerName), sickLeave });
        default:
            throw new Error(`Incorrect entry type`);
    }
};
exports.toNewEntry = toNewEntry;
