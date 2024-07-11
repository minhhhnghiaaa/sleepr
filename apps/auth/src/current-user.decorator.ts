import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from './users/models/users.schema';

const GetCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  const request = context.switchToHttp().getRequest();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    GetCurrentUserByContext(context),
);
