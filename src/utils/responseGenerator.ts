import IResponse from '../interfaces/IResponse';

const responseGenerator = (status = 200, message = '', data = {}): IResponse => (
  {
    status,
    message,
    data,
  }
);

export default responseGenerator;