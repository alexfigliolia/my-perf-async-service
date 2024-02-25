export interface ICreatePull {
  api_url: string;
  token: string;
  organizationId: number;
}

export interface IRepositoryPull extends ICreatePull {
  id: number;
  currentPage: number;
  pageSize: number;
}
