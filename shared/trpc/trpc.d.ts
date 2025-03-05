// Type declarations for tRPC modules

declare module '@trpc/server' {
  // Add any necessary type declarations here
}

declare module '@trpc/react-query' {
  export function createTRPCReact<TRouter extends any>(): any;
}

declare module '@trpc/client' {
  export function httpBatchLink(opts: { url: string }): any;
}

declare module '@tanstack/react-query' {
  export class QueryClient {
    constructor();
  }
}
