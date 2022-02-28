import IResponse from '../interfaces/IResponse';

export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCCESABLE_ENTITY = 422,
  SERVER_ERROR = 500,
}

export const handleErrorType = (type: string) => {
  const Status = {
    required: StatusCodes.BAD_REQUEST,
    default: StatusCodes.UNPROCCESABLE_ENTITY,
  };

  return type === 'any.required' ? Status.required : Status.default;
};

export const responseGenerator = (status = 200, message = '', data = {}): IResponse => (
  {
    status,
    message,
    data,
  }
);
