import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { IGetUkdSchedule, IUkdSchedule } from './interfaces';

@Injectable()
export class UkdScheduleService {
  constructor(private readonly httpService: HttpService) {}

  private readonly log = new Logger(UkdScheduleService.name);
  private readonly axios = this.httpService.axiosRef;

  async getGroups(): Promise<string[]> {
    try {
      const response = await this.axios.get<string[]>('/groups');
      return response.data;
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  }

  async getTeachers(): Promise<string[]> {
    try {
      const response = await this.axios.get<string[]>('/teachers');
      return response.data;
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  }

  async getSchedule(params: IGetUkdSchedule) {
    try {
      const response = await this.axios.get<IUkdSchedule[]>('/schedules', { params });
      return response.data;
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  }
}
