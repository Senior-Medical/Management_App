"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FindQueryBuilderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindQueryBuilderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const query_dto_1 = require("../dtos/query.dto");
let FindQueryBuilderService = FindQueryBuilderService_1 = class FindQueryBuilderService {
    constructor(query, queryParams) {
        this.page = FindQueryBuilderService_1.defaultPage;
        this.pageSize = FindQueryBuilderService_1.defaultPageSize;
        this.sortKey = FindQueryBuilderService_1.defaultSortKey;
        this.searchKey = FindQueryBuilderService_1.defaultSearchKey;
        this.customFilters = {
            username: "",
            role: "",
            from: "",
            to: "",
            percentage: "",
            worker: "",
            product: "",
            department: "",
            quantity: "",
            arabicDate: "",
            cost: "",
            price: "",
            name: "",
            createdBy: "",
            updatedBy: "",
            createdAtArabic: "",
            updatedAtArabic: "",
        };
        this.query = query;
        this.queryParams = queryParams;
    }
    resetParameters(query, queryParams) {
        this.page = FindQueryBuilderService_1.defaultPage;
        this.pageSize = FindQueryBuilderService_1.defaultPageSize;
        this.sortKey = FindQueryBuilderService_1.defaultSortKey;
        this.searchKey = FindQueryBuilderService_1.defaultSearchKey;
        this.query = query;
        this.queryParams = queryParams;
        for (const key in this.customFilters)
            this.customFilters[key] = "";
    }
    filter() {
        const filterObj = { ...this.queryParams };
        delete filterObj.page;
        delete filterObj.pageSize;
        delete filterObj.sort;
        delete filterObj.fields;
        delete filterObj.search;
        delete filterObj.error;
        if (Object.keys(filterObj).length === 0)
            return this;
        for (const e of Object.entries(filterObj)) {
            let value = e[1];
            if (e[1].startsWith("objectid:")) {
                value = e[1].replace("objectid:", "");
                e[1] = new mongoose_1.Types.ObjectId(value);
            }
            else if (e[1].startsWith("gt:")) {
                e[1] = { $gt: e[1].replace("gt:", "") };
            }
            else if (e[1].startsWith("gte:")) {
                e[1] = { $gte: e[1].replace("gte:", "") };
            }
            else if (e[1].startsWith("lt:")) {
                e[1] = { $lt: e[1].replace("lt:", "") };
            }
            else if (e[1].startsWith("lte:")) {
                e[1] = { $lte: e[1].replace("lte:", "") };
            }
            else if (e[1].startsWith("in:")) {
                value = e[1].replace("in:", "").split(",");
                e[1] = { $in: value };
            }
            else if (e[1].startsWith("search:")) {
                value = e[1].replace("search:", "");
                e[1] = new RegExp(value, 'i');
            }
            filterObj[e[0]] = e[1];
            this.customFilters[e[0]] = value;
        }
        this.query = this.query.find(filterObj);
        return this;
    }
    paginate() {
        if (this.queryParams.page)
            this.page = this.queryParams.page;
        if (this.queryParams.pageSize)
            this.pageSize = this.queryParams.pageSize;
        const skip = (this.page - 1) * this.pageSize;
        this.query = this.query.skip(skip).limit(this.pageSize);
        return this;
    }
    sort() {
        if (this.queryParams.sort)
            this.sortKey = this.queryParams.sort;
        this.query = this.query.sort(this.sortKey);
        return this;
    }
    selectFields() {
        if (this.queryParams.fields)
            this.query = this.query.select(this.queryParams.fields);
        return this;
    }
    search(searchableFields) {
        if (this.queryParams.search) {
            this.searchKey = this.queryParams.search;
            const searchRegex = new RegExp(this.searchKey, 'i');
            let searchObject = searchableFields.map(field => ({ [field]: searchRegex }));
            this.query = this.query.find({ $or: searchObject });
        }
        return this;
    }
    build() {
        return this.query;
    }
    async getTotalPages() {
        const totalCount = await this.query.model.countDocuments(this.query.getFilter());
        return Math.ceil(totalCount / this.pageSize);
    }
    getPage() {
        return this.page;
    }
    getPageSize() {
        return this.pageSize;
    }
    getSortKey() {
        return this.sortKey;
    }
    getSearchKey() {
        return this.searchKey;
    }
    getCustomFilters() {
        return this.customFilters;
    }
};
exports.FindQueryBuilderService = FindQueryBuilderService;
FindQueryBuilderService.defaultPageSize = 10;
FindQueryBuilderService.defaultSortKey = '-createdAt';
FindQueryBuilderService.defaultSearchKey = "";
FindQueryBuilderService.defaultPage = 1;
exports.FindQueryBuilderService = FindQueryBuilderService = FindQueryBuilderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongoose_1.Query, query_dto_1.QueryDto])
], FindQueryBuilderService);
//# sourceMappingURL=find-query-builder.service.js.map