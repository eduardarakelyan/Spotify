import React, { FC, ReactElement } from "react";
import { Card } from "antd";
const { Meta } = Card;

export const CardForHomePage: FC<CardForHomeType> = function ({
  title = "",
  image = "",
  description = "",
  menu = <></>,
}: CardForHomeType) {
  return (
    <Card
      hoverable
      className="group relative m-5 w-44 bg-gray-200 font-normal"
      cover={<img alt="example" src={image} />}
    >
      <Meta title={title} description={description} className="p-1" />
      <div className="absolute bottom-1 right-1 rounded-2xl bg-sky-900 text-gray-200 opacity-0 duration-300 ease-in group-hover:opacity-100">
        {menu}
      </div>
    </Card>
  );
};

type CardForHomeType = {
  title: string;
  image: string;
  description: string;
  menu?: ReactElement;
};
