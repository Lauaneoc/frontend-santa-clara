import {
  BuildingLibraryIcon,
  UserCircleIcon,
  CalendarIcon,
  DocumentMagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export const management = [
  {
    name: "Empresas",
    description: "Gerencie as informações das empresas.",
    href: "enterprise",
    icon: BuildingLibraryIcon,
  },
  {
    name: "Pacientes",
    description: "Gerencie os dados dos pacientes.",
    href: "patient",
    icon: UserCircleIcon,
  },
  {
    name: "Agendamentos",
    description: "Gerencie os agendamentos de consultas.",
    href: "scheduling",
    icon: CalendarIcon,
  },
  {
    name: "Exames",
    description: "Gerencie os tipos exames cadastrados.",
    href: "exam",
    icon: DocumentMagnifyingGlassIcon,
  },
  {
    name: "Médicos",
    description: "Gerencie as informações dos médicos.",
    href: "doctor",
    icon: UserIcon,
  },
];
