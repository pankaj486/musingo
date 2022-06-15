import { ExperienceType } from "./models/ExperienceType";

export const ROUTES = {
  createExperience: () => "/createExperience",
  createExperienceForm: (type: ExperienceType) => {
    const postfix = {
      [ExperienceType.Lesson]: "classes",
      [ExperienceType.Job]: "jobs",
      [ExperienceType.Instrument]: "instruments",
      [ExperienceType.Concert]: "concerts",
    };
    return `/createExperience/${postfix[type]}`;
  },
};
