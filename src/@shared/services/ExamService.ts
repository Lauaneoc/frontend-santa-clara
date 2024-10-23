import axios from 'axios';
import { Exam } from '../interfaces/models/Exams';
import api from './api/api';

const ExamService = {
    getExams: async () => {
        const response = await axios.get<Exam[]>(`${api}/exams`);
        return response.data;
    },
    createOne: async (exam: Partial<Exam>) => {
        const response = await axios.post<Exam>(`${api}/exams`, exam);
        return response.data;
    },
    updateOne: async (exam: Exam) => {
        const response = await axios.put<Exam>(`${api}/exams/${exam.id}`, exam);
        return response.data;
    },
    deleteOne: async (examId: string) => {
        await axios.delete(`${api}/exams/${examId}`);
    },
};

export default ExamService;
