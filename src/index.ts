import { Readable } from 'stream';
import { InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import FormData from 'form-data';

type KeyValues = {
  [key: string]: unknown;
};

function isObject(data: unknown) {
  const type = typeof data;
  return type === 'function' || (type === 'object' && !!data);
}

function isFile(value: unknown) {
  // TODO check if other ways of telling if it's a file should be supported
  return value && value instanceof Readable;
}

function hasFileEntry(data: KeyValues): boolean {
  return Object.values(data).some(isFile);
}

/**
 * Decorate axios instance with this function,
 * so that "data" is checked on every call,
 * and where there is a file, it will use FormData to send it.
 */
export default function axiosFormData(
  config: InternalAxiosRequestConfig<KeyValues>,
): InternalAxiosRequestConfig<KeyValues> | InternalAxiosRequestConfig<FormData> {
  // return if
  // - no body
  // - body isn't an object
  // - body has no file type values
  if (!config.data || !isObject(config.data) || !hasFileEntry(config.data)) {
    return config;
  }

  // build form data from original data
  const formData = new FormData();
  Object.entries(config.data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // amend original config
  return {
    ...config,
    headers: {
      ...config.headers ,
     ...formData.getHeaders(),
    } as AxiosRequestHeaders,
    data: formData,
  };
}
