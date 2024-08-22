import { IJwtPayload } from './jwt-payload.interface';

export interface IJwtPayloadResponse extends IJwtPayload {
  iat: number;
  exp: number;
}
