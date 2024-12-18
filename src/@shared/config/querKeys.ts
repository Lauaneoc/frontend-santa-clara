// src/config/queryKeys.ts

export const queryKeys = {
  EXAM: {
    FIND_MANY: "findManyExams" as const,
  },
  PATIENT: {
    FIND_MANY: "findManyPatients" as const,
  },
  DOCTOR: {
    FIND_MANY: "findManyDoctors" as const,
  },
  ENTERPRISE: {
    FIND_MANY: "findManyEnterprises" as const,
  },
  SCHEDULING: {
    FIND_MANY: "findManySchedulings" as const,
    COUNT_BY_STATUS: "countExamsByStatus" as const,
    TOP_ENTERPRISES: "getTopEnterprisesByScheduling" as const,
    TOP_20_EXAMS: "getTop20Exams" as const,
  },
  USER: {
    FIND_MANY: "findManyUsers" as const,
  },
};
