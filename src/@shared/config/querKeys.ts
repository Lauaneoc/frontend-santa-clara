// src/config/queryKeys.ts
export const queryKeys = {
  EXAM: {
    FIND_MANY: "findManyExams" as const, // Use `as const` para garantir que o tipo seja literal
  },
  PATIENT: {
    FIND_MANY: "findManyPatients" as const, // Use `as const` para garantir que o tipo seja literal
  },
  DOCTOR: {
    FIND_MANY: "findManyDoctors" as const,
  },
  ENTERPRISE: {
    FIND_MANY: "findManyEnterprises" as const,
  },
  SCHEDULING: {
    FIND_MANY: "findManyScheduling" as const,
  },
};
