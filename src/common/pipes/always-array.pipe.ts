import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AlwaysArrayPipe implements PipeTransform {
  transform<T>(value: T): T[] {
    if (!value) return [];

    return Array.isArray(value) ? value : [value];
  }
}
