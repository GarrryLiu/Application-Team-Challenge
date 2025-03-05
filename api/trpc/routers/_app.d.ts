export declare const appRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        res: import("express").Response<any, Record<string, any>>;
    };
    meta: object;
    errorShape: import("@trpc/server").DefaultErrorShape;
    transformer: import("@trpc/server").DefaultDataTransformer;
}>, {
    participant: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>, {
        getAll: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: import("express").Response<any, Record<string, any>>;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
            };
            _input_in: {
                gender?: string | undefined;
                sort?: "icdCount" | "name" | undefined;
                page?: number | undefined;
                limit?: number | undefined;
                sortOrder?: "asc" | "desc" | undefined;
                sortOnlyOnPage?: string | undefined;
                search?: string | undefined;
                icdSearch?: string | undefined;
                category?: string | undefined;
                age?: string | undefined;
            };
            _input_out: {
                sort: "icdCount" | "name";
                page: number;
                limit: number;
                sortOrder: "asc" | "desc";
                gender?: string | undefined;
                sortOnlyOnPage?: string | undefined;
                search?: string | undefined;
                icdSearch?: string | undefined;
                category?: string | undefined;
                age?: string | undefined;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            total: number;
            totalPages: number;
            page: number;
            limit: number;
            sortedOnPage: string;
            searchQuery: string;
            icdSearchQuery: string;
            sortOrder: "asc" | "desc";
            data: {
                id: string;
                firstName: string;
                lastName: string;
                dateOfBirth: Date;
                gender: "MALE" | "FEMALE" | "NON-BINARY";
                phoneNumber: number;
                patientNotes: string | null;
                diagnoses: {
                    icdCode: string;
                    timestamp: Date;
                    conditionName?: string | undefined;
                }[];
            }[];
        }>;
        getById: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: import("express").Response<any, Record<string, any>>;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
            };
            _input_in: {
                id: string;
            };
            _input_out: {
                id: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            diagnoses: {
                icdCode: string;
                conditionName: string;
                timestamp: Date;
            }[];
            id: string;
            firstName: string;
            lastName: string;
            dateOfBirth: Date;
            gender: "MALE" | "FEMALE" | "NON-BINARY";
            phoneNumber: number;
            patientNotes: string | null;
        }>;
    }>;
}>;
export type AppRouter = typeof appRouter;
