import { valueOrDefault } from "../utils/utils";
const ACCESS_TOKEN =
  "BQB3OVs9ybGWf3F85PNdHZn3poyWsyrorsy1kRHol5iJ_1ZygY2C5wwatSLlc_Eg861M2noBiNcg7hv6z7DciDrwQydlreGzDL86k0_W4hiA2dACuY0B5baTrN5tpmR81u_fXoYfEf0V-CkLaa1owcgf484iMZtnyL04gDfu2hjXtCLvNsjvDWfzmWtIxKAUqGCRjLmja_ihYQamSA4M2tS1_-PDDf68a1gg7Yu3vUh5w4R_T0EiqHNiPKQSBjCeGA5h5SPCIjyWfj1zqiK5Uyc";

const getParams: getParamType = (params) =>
  new URLSearchParams(params).toString();
const getUrl: getUrlType = (segments: any, url: urlType) =>
  typeof url === "string" ? url : url(segments);

const request: requestType = function (options) {
  return new Promise((resolve, reject) => {
    fetch(
      options.params
        ? `${options.url}?${getParams(options.params)}`
        : options.url,
      { ...options }
    )
      .then((response) => {
        response.text().then((data) => {
          let responseData = undefined;
          try {
            responseData = JSON.parse(data);
          } finally {
            if (
              response.ok &&
              response.status >= 200 &&
              response.status <= 299
            ) {
              resolve({
                ok: response.ok,
                status: response.status,
                data: responseData,
              });
            } else {
              reject({
                ok: response.ok,
                status: response.status,
                data: valueOrDefault(
                  "Error performing the Action!",
                  responseData?.message?.toString()
                ),
              });
            }
          }
        });
      })
      .catch((error) => {
        reject({
          ok: false,
          data: valueOrDefault(
            "Error performing the action!",
            error?.message?.toString()
          ),
        });
      });
  });
};

export const GET: httpCallType =
  (url) =>
  ({
    segments,
    params,
    body,
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }: optionsType) =>
    request({
      params,
      body: JSON.stringify(body),
      headers,
      method: "get",
      url: getUrl(segments, url),
    });

export const POST: httpCallType =
  (url) =>
  ({
    segments,
    params,
    body,
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }: optionsType) =>
    request({
      params,
      body: JSON.stringify(body),
      headers,
      method: "post",
      url: getUrl(segments, url),
    });

export const PUT: httpCallType =
  (url) =>
  ({
    segments,
    params,
    body,
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }: optionsType) =>
    request({
      params,
      body: JSON.stringify(body),
      headers,
      method: "put",
      url: getUrl(segments, url),
    });

export const DELETE: httpCallType =
  (url) =>
  ({
    segments,
    params,
    body,
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }: optionsType) =>
    request({
      params,
      body: JSON.stringify(body),
      headers,
      method: "delete",
      url: getUrl(segments, url),
    });

type urlFnType = (v: any) => string;
type urlType = string | urlFnType;
type optionsType = {
  url?: string;
  segments?: any;
  params?: any;
  body?: any;
  headers?: any;
};
type getParamType = (param: any) => string;
type requestType = (options: any) => Promise<any>;
type getUrlType = (segments: any, url: urlType) => string;
type httpCallType = (url: urlType) => (o: optionsType) => Promise<any>;
