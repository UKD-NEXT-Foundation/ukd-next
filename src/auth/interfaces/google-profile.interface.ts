import { AuthProvider } from '@src/users/enums/auth-provider.enum';

export interface IGoogleProfile {
  provider: AuthProvider;
  providerId: number;
  email: string;
  name: string;
  picture: string;
}
