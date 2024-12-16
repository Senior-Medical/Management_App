import { PagesTypes } from "src/dashboard/enums/pagesTypes.enum";
import { UserDocument } from "../entities/user.entity";

export type DashboardRenderVariablesType = {
  error: string | null,
  title: string,
  type: PagesTypes,
  data: Array<any> | null,
  user: UserDocument,
  admins: Array<UserDocument>,
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