import axios from "axios";
import { Patient } from "../interfaces/models/Patient";

const PatientService = {
  getPatients: async () => {
    try {
      const response = await axios.get("http://10.0.0.129:8080/paciente");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  },
  createOne: async (patient: Partial<Patient>) => {
    const response = await axios.post<Patient>(
      `http://10.0.0.129:8080/paciente`,
      patient
    );
    return response.data;
  },
  updateOne: async (patient: Patient) => {
    const response = await axios.put<Patient>(
      `http://10.0.0.129:8080/paciente/${patient.id}`,
      patient
    );
    return response.data;
  },
  deleteOne: async (patientId: string) => {
    await axios.delete(`http://10.0.0.129:8080/paciente/${patientId}`);
  },
};

export default PatientService;
