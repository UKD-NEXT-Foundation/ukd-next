import ms from 'ms';

export class Timer {
  private startTime: number;
  private endTime: number;

  start(): Timer {
    this.startTime = Date.now();
    return this;
  }

  end(): Timer {
    this.endTime = Date.now();
    return this;
  }

  result(): number {
    return this.endTime - this.startTime;
  }

  formattedResult(): string {
    return ms(this.result());
  }
}
