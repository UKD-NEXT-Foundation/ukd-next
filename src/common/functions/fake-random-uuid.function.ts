import { randomUUID } from 'crypto';

export function fakeRandomUuid() {
  return 'FAKE#' + randomUUID().slice(5, -5) + '#FAKE';
}
