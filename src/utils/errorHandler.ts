import StatusCodes from './StatusCodes';

const handleErrorType = (type: string) => {
  switch (type) {
    case 'any.required':
      return StatusCodes.BAD_REQUEST;
    default:
      return StatusCodes.UNPROCCESABLE_ENTITY;
  }
};

export default handleErrorType;