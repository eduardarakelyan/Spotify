import React, { FC } from "react";
import { Space } from "antd";
import Search from "antd/es/input/Search";

export const SearchBox: FC<SearchBoxType> = function ({
  onSearch,
}: SearchBoxType) {
  return (
    <div>
      <Space direction="vertical">
        <Search
          placeholder="search for a track/album"
          style={{ width: 250, marginLeft: "5rem", marginTop: "1rem" }}
          onChange={(e) => {
            if (e.target.value === "") {
              onSearch("");
            }
          }}
          onPressEnter={(value) => {
            onSearch(value.currentTarget.value);
          }}
          onSearch={(value) => {
            onSearch(value);
          }}
          allowClear
        />
      </Space>
    </div>
  );
};

type SearchBoxType = {
  onSearch: (o: string) => void;
};
