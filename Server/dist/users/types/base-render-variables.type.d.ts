import { UserDocument } from "../entities/user.entity";
type Filters = {
    search: string;
    sort: string;
    pagination: {
        page: number;
        pageSize: number;
        totalPages: number;
    };
    [key: string]: any;
};
export type BaseRenderVariablesType = {
    error: string | null;
    data: Array<any> | null;
    user: UserDocument;
    filters: Filters;
};
export {};
