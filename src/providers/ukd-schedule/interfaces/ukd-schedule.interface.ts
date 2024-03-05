import { IUkdScheduleLesson } from './ukd-schedule-lesson.interface';

export interface IUkdSchedule {
  date: Date;
  weekName: string;
  lessons: IUkdScheduleLesson[];
}
