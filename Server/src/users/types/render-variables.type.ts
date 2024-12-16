import { UserDocument } from "../entities/user.entity";

export type DashboardRenderVariablesType = {
  error: string | null,
  data: Array<any> | null,
  user: UserDocument,
  users: Array<UserDocument>,
  filters: {
    search: string,
    sort: string,
    pagination: {
      page: number,
      pageSize: number,
      totalPages: number,
    },
    filter: object[]
  }
};