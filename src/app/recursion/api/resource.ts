type ResourceStatus = "pending" | "success" | "error";

interface Resource<T> {
  read: () => T;
}

export const wrapPromise = <T>(promise: Promise<T>): Resource<T> => {
  let status: ResourceStatus = "pending";
  let result: T | Error;

  const suspender = promise.then(
    (data) => {
      status = "success";
      result = data;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return {
    read: () => {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else {
        return result as T;
      }
    },
  };
};
