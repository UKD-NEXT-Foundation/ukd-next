import { SetMetadata } from '@nestjs/common';

import { UserRole } from '@app/common/enums';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
