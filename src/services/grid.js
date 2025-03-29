import { AppError } from '../utils/errors';
import { backendErrorsMap } from '../utils/errors';

export const saveGrid = async (grid, words) => {
  let body = JSON.stringify({ grid });

  try {
    const res = await fetch(`${process.env.REACT_APP_ENDPOINT_URL}/grid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
    if (!res.ok) {
      if (res.status >= 400 && res.status <= 499) {
        const error = await res.json();

        throw new AppError(res.status, backendErrorsMap[error.message]?.(error.key));
      }

      throw new AppError(res.status, 'Something went wrong! Try again later!');
    }

    return res;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(500, 'Something went wrong! Try again later!');
  }
};
