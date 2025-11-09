import { restApiCommBaseService } from './restApiCommBaseService';

class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.headers = defaultHeaders;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
      },
      signal: controller.signal,
    };

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      return restApiCommBaseService.handleResponse(response);
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Create API clients for different services
export const veloApiClient = new ApiClient(
  import.meta.env.VITE_VELOSURE_API_URL || '',
  {
    'X-API-KEY': import.meta.env.VITE_VELOSURE_API_KEY || '',
    'content-type': 'application/json',
  }
);

export const transactorApiClient = new ApiClient(
  import.meta.env.VITE_TRANSACTOR_API_ENDPOINT || '',
  {
    authKey: import.meta.env.VITE_TRANSACTOR_AUTH_KEY || '',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
);

export const aggregatorApiClient = new ApiClient(
  import.meta.env.VITE_AGGREGATOR_API_ENDPOINT || '',
  {
    ApiKey: import.meta.env.VITE_AGGREGATOR_AUTH_KEY || '',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
);

export const paymentsApiClient = new ApiClient(
  `${import.meta.env.VITE_PAYMENTS_API_PATH}/api/payments`,
  {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
);