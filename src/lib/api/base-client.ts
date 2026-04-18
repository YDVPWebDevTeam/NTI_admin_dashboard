import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { type ApiResponse } from './types';

const DEFAULT_API_BASE_URL = 'http://localhost:3001/api';
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, '');

type ApiEnvelope<T> = ApiResponse<T>;

function isApiEnvelope<T>(value: unknown): value is ApiEnvelope<T> {
  return Boolean(
    value &&
    typeof value === 'object' &&
    'success' in value &&
    'data' in value &&
    'message' in value,
  );
}

export function buildApiUrl(path: string): string {
  if (path.startsWith('/api/')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${API_BASE_URL}${normalizedPath}`;
}

function toError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }

  return new Error('Request failed');
}

export function extractApiErrorMessage(payload: unknown): string {
  if (isApiEnvelope<unknown>(payload)) {
    return payload.message || 'Request failed';
  }

  if (payload && typeof payload === 'object' && 'message' in payload) {
    return String(payload.message);
  }

  return 'Request failed';
}

function unwrapResponseData<TResponse>(payload: unknown): TResponse {
  if (isApiEnvelope<TResponse>(payload)) {
    if (!payload.success) {
      throw new Error(payload.message || 'Request failed');
    }

    return payload.data;
  }

  return payload as TResponse;
}

function createApiClient(config?: AxiosRequestConfig): AxiosInstance {
  return axios.create({
    withCredentials: true,
    ...config,
  });
}

export const apiClient = createApiClient();

export async function request<TResponse>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  try {
    const response = await apiClient.request<unknown>({
      ...config,
      url: buildApiUrl(path),
    });

    return unwrapResponseData<TResponse>(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(extractApiErrorMessage(error.response?.data));
    }

    throw toError(error);
  }
}

export const api = {
  get<TResponse>(path: string, config?: AxiosRequestConfig) {
    return request<TResponse>(path, {
      ...config,
      method: 'GET',
    });
  },

  post<TResponse, TBody = unknown>(path: string, data?: TBody, config?: AxiosRequestConfig) {
    return request<TResponse>(path, {
      ...config,
      data,
      method: 'POST',
    });
  },

  put<TResponse, TBody = unknown>(path: string, data?: TBody, config?: AxiosRequestConfig) {
    return request<TResponse>(path, {
      ...config,
      data,
      method: 'PUT',
    });
  },

  patch<TResponse, TBody = unknown>(path: string, data?: TBody, config?: AxiosRequestConfig) {
    return request<TResponse>(path, {
      ...config,
      data,
      method: 'PATCH',
    });
  },

  delete<TResponse>(path: string, config?: AxiosRequestConfig) {
    return request<TResponse>(path, {
      ...config,
      method: 'DELETE',
    });
  },
};
