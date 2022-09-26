import React, { FC, useState } from "react";
import { Tracks } from "./Tracks";
import { Albums } from "./Albums";
import { SearchBox } from "../components/SearchBox";
import { getSearchForItem } from "../services/service";
import { ResponseType } from "../utils/uitypes";
import { SearchItemsType } from "../utils/type";

export const Home: FC = function () {
  const [filteredAlbumsAndTracks, setFilteredAlbumsAndTracks] =
    useState<SearchItemsType | null>(null);
  const [displayFilteredResults, setDisplayFilteredResults] =
    useState<boolean>(true);

  const searchItems: searchItemsType = (search) => {
    getSearchForItem({
      params: {
        q: search,
        type: "album,track",
        market: "US",
        limit: 10,
      },
    })
      .then(({ data }: ResponseType<SearchItemsType>) => {
        setFilteredAlbumsAndTracks(data);
        if (
          data?.albums.items.length === 0 &&
          data?.tracks.items.length === 0
        ) {
          setDisplayFilteredResults(false);
        } else {
          setDisplayFilteredResults(true);
        }
      })
      .catch((error: string) => {});
  };
  return (
    <div>
      <SearchBox
        onSearch={(search) => {
          search === ""
            ? setFilteredAlbumsAndTracks(null)
            : searchItems(search);
        }}
      />
      {displayFilteredResults ? (
        <div>
          <Albums albums={filteredAlbumsAndTracks?.albums} />
          <Tracks recommendedTracks={filteredAlbumsAndTracks?.tracks} />
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-2xl text-gray-200">No Results Found</h1>
        </div>
      )}
    </div>
  );
};

type searchItemsType = (search: string) => void;
