import { NextRouter, useRouter } from "next/router";

type Options = {
  parseNumbers?: boolean;
  parseBooleans?: boolean;
  includes?: string[];
};

const defaultOptionValues: Options = {
  parseNumbers: false,
  parseBooleans: false,
};

const parseValue = (value: any, options: Options) => {
  if (
    options.parseNumbers &&
    !Number.isNaN(Number(value)) &&
    typeof value === "string" &&
    value.trim() !== ""
  ) {
    value = Number(value);
  } else if (
    options.parseBooleans &&
    value !== null &&
    typeof value === "string" &&
    (value.toLowerCase() === "true" || value.toLowerCase() === "false")
  ) {
    value = value.toLowerCase() === "true";
  }

  return value;
};

export function useRouterQuery(options: Options = {}) {
  const router = useRouter();
  const opts = Object.assign({}, defaultOptionValues, options);
  const queries: Record<string, any> = {};

  for (const key of Object.keys(router.query)) {
    if (
      !Array.isArray(options.includes) ||
      (Array.isArray(options.includes) && options.includes.includes(key))
    ) {
      queries[key] = parseValue(router.query[key], opts);
    }
  }

  return queries;
}
