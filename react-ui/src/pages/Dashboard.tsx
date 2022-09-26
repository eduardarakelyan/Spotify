import React, { FC } from "react";

export const Dashboard: FC<DashboardType> = function ({ code }: DashboardType) {
  return <div className="mt-3">{code}</div>;
};

type DashboardType = {
  code: string;
};
