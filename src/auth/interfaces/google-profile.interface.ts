import { oauth2_v2 } from 'googleapis';

export interface IGoogleProfile extends oauth2_v2.Schema$Userinfo {
  language?: string;
}
