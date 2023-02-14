import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type RouteParams = { uid?: string }
type RouteId = '/(admin)/config/[[uid]]';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
type PageServerParentData = Omit<EnsureDefined<import('../../../$types.js').LayoutServerData>, keyof import('../../$types.js').LayoutServerData> & EnsureDefined<import('../../$types.js').LayoutServerData>;
type PageParentData = Omit<EnsureDefined<import('../../../$types.js').LayoutData>, keyof import('../../$types.js').LayoutData> & EnsureDefined<import('../../$types.js').LayoutData>;

export type PageServerLoad<OutputData extends Partial<App.PageData> & Record<string, any> | void = Partial<App.PageData> & Record<string, any> | void> = Kit.ServerLoad<RouteParams, PageServerParentData, OutputData, RouteId>;
export type PageServerLoadEvent = Parameters<PageServerLoad>[0];
export type ActionData = Expand<Kit.AwaitedActions<typeof import('./proxy+page.server.js').actions>> | null;
export type PageServerData = Expand<OptionalUnion<EnsureDefined<Kit.AwaitedProperties<Awaited<ReturnType<typeof import('./proxy+page.server.js').load>>>>>>;
export type PageLoad<OutputData extends OutputDataShape<PageParentData> = OutputDataShape<PageParentData>> = Kit.Load<RouteParams, PageServerData, PageParentData, OutputData, RouteId>;
export type PageLoadEvent = Parameters<PageLoad>[0];
export type PageData = Expand<Omit<PageParentData, keyof Kit.AwaitedProperties<Awaited<ReturnType<typeof import('../../../../../../../src/routes/(admin)/config/[[uid]]/+page.js').load>>>> & OptionalUnion<EnsureDefined<Kit.AwaitedProperties<Awaited<ReturnType<typeof import('../../../../../../../src/routes/(admin)/config/[[uid]]/+page.js').load>>>>>>;
export type Action<OutputData extends Record<string, any> | void = Record<string, any> | void> = Kit.Action<RouteParams, OutputData, RouteId>
export type Actions<OutputData extends Record<string, any> | void = Record<string, any> | void> = Kit.Actions<RouteParams, OutputData, RouteId>
export type RequestEvent = Kit.RequestEvent<RouteParams, RouteId>;