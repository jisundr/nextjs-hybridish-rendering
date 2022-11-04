import { NextRouter, useRouter } from "next/router";

export function useRouterQuery() {
  const router = useRouter();
  return router.query;
}
