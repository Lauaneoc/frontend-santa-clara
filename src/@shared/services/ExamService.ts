import axios from 'axios';
import { Exam } from '../interfaces/models/Exams';

const ExamService = {
    getExams: async (p0: any) => {
        try {
            const response = await axios.get('http://localhost:3000/exame');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching exams:', error);
            throw error; 
        }
    },
    createOne: async (exam: Partial<Exam>) => {
        const response = await axios.post<Exam>(`http://localhost:3000/exame`, exam);
        return response.data;
    },
    updateOne: async (exam: Exam) => {
        const response = await axios.patch<Exam>(`http://localhost:3000/exame/${exam.id}`, exam);
        return response.data;
    },
    deleteOne: async (examId: string) => {
        await axios.delete(`http://localhost:3000/exame/${examId}`);
    },
};

export default ExamService;
