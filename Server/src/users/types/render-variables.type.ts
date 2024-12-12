import { PagesTypes } from "src/dashboard/enums/pagesTypes.enum";
import { UserDocument } from "../entities/user.entity";

export type DashboardRenderVariablesType = {
  title: string,
  type: PagesTypes,
  data: Array<any> | null,
  user: UserDocument,
  filters: {
    search: string,
    sort: string,
    pagination: {
      page: number,
      pageSize: number,
      totalPages: number,
    },
  }
};