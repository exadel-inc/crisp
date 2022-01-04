type RetryOperationType = {
  readonly delay: number;
  readonly retries: number;
};

export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const retryOperation = async (operation, { delay, retries }: RetryOperationType) => {
  return operation().catch(async (reason: Error) => {
    if (retries > 0) {
      await wait(delay);
      return retryOperation(operation, { delay, retries: retries - 1 });
    }
    throw reason;
  });
};
