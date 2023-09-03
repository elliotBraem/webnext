import { request } from "near-social-bridge";

export const getAllThings = (payload: { accounts?: string[], type: string, id?: string, blockHeight?: string | number }) => request('get-all-things', payload);
