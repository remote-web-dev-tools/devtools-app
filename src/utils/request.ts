export interface RequestOptions {
  method?: 'GET' | 'POST';
  data?: Record<string, any>;
}

function getApi(url: string): string {
  let host = localStorage.getItem('host') as string;
  let port = localStorage.getItem('port') as string;

  return host + (port ? `:${port}` : '') + url;
}

export const request = (url: string, options: RequestOptions = {}) => {
  return fetch(getApi(url), {
    method: options.method || 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === 'success') {
        return data.data;
      } else {
        return Promise.reject(new Error(data.message));
      }
    });
};
