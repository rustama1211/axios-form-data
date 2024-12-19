import { InternalAxiosRequestConfig } from 'axios';
import FormData from 'form-data';
declare type KeyValues = {
    [key: string]: unknown;
};
/**
 * Decorate axios instance with this function,
 * so that "data" is checked on every call,
 * and where there is a file, it will use FormData to send it.
 */
export default function axiosFormData(config: InternalAxiosRequestConfig<KeyValues>): InternalAxiosRequestConfig<KeyValues> | InternalAxiosRequestConfig<FormData>;
export {};
//# sourceMappingURL=index.d.ts.map