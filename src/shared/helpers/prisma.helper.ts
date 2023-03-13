import { PRISMA_ERRORS } from '../constants';

export const extractPrismaError = (error: any) => {
  const msg = PRISMA_ERRORS[error?.code];

  const message = msg
    ? {
        key: error.code,
        message: msg.replace('%s', error.meta.target),
      }
    : {
        message: error?.message,
        errors: error,
      };

  return message;
};
