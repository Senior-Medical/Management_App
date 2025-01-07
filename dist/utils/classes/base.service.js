"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const find_query_builder_service_1 = require("./find-query-builder.service");
class BaseService {
    constructor() {
        this.queryBuilder = null;
    }
    getQueryBuilder(queryParams, filter = {}) {
        const query = this.getModuleModel().find(filter);
        if (!this.queryBuilder)
            this.queryBuilder = new find_query_builder_service_1.FindQueryBuilderService(query, queryParams);
        else
            this.queryBuilder.resetParameters(query, queryParams);
        return this.queryBuilder;
    }
    find(filter = {}) {
        return this.getModuleModel().find(filter);
    }
    ;
    async findAll(queryParams, user) {
        const queryBuilder = this.getQueryBuilder(queryParams);
        const data = await queryBuilder
            .filter()
            .search(this.searchableKeys)
            .sort()
            .paginate()
            .build()
            .populate('createdBy', 'username')
            .populate('updatedBy', 'username');
        const baseRenderVariables = {
            error: queryParams.error || null,
            data,
            user,
            filters: {
                search: queryBuilder.getSearchKey(),
                sort: queryBuilder.getSortKey(),
                pagination: {
                    page: queryBuilder.getPage(),
                    totalPages: await queryBuilder.getTotalPages(),
                    pageSize: queryBuilder.getPageSize()
                },
                ...queryBuilder.getCustomFilters()
            }
        };
        const renderVariables = { ...baseRenderVariables, ...(await this.getAdditionalRenderVariables()) };
        return renderVariables;
    }
    findById(id) {
        return this.getModuleModel().findById(id);
    }
    ;
    findOne(filter) {
        return this.getModuleModel().findOne(filter);
    }
    ;
    updateMany(filter, updateDto) {
        return this.getModuleModel().updateMany(filter, updateDto);
    }
    removeMany(filter) {
        return this.getModuleModel().deleteMany(filter);
    }
    async remove(entity) {
        await this.getModuleModel().findByIdAndDelete(entity._id);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map