// Authentication
export type AuthenticationType = {
  credentials: LoginType;
  code?: string;
  token?: string;
};

export type LoginType = {
  clientId: string;
  clientSecret: string;
};

// Album
export type AlbumType = {
  album_type: string;
  artists: Array<ArtistType>;
  total_tracks: number;
  available_markets: Array<string>;
  external_urls: ExternalUrlsType;
  id: string;
  images: Array<ImageType>;
  name: string;
  release_date: string;
  length: number;
};

export type AlbumsListType = {
  albums: AlbumReleasesType;
};

// new album releases
export type AlbumReleasesType = {
  href: string;
  items: Array<AlbumType>;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
};
export type ExternalUrlsType = {
  spotify: string;
};

export type ImageType = {
  url: string;
  height: number;
  width: number;
};

// ARTIST
export type ArtistType = {
  external_urls: ExternalUrlsType;
  genres: Array<string>;
  id: string;
  images: Array<ImageType>;
  name: string;
  type: string;
};

// Playlist
export type PlaylistType = {
  description: string | null;
  external_urls: ExternalUrlsType;
  id: string;
  images: Array<ImageType>;
  name: string;
  tracks: TracksType;
};

// getUsersPlaylistType
export type getUsersPlaylistType = {
  href: string;
  items: Array<any>;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

// get playlist items
export type playlistItemsType = {
  href: string;
  items: Array<any>;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

// remove playlist items
export type removePlaylistItems = {
  snapshot_id: string;
};

// addItemsToPlaylistType
export type addItemsToPlaylistType = {
  snapshot_id: string;
};

// create a playlist type
export type CreateAPlaylistType = {
  description: string | null;
  external_urls: ExternalUrlsType;
  id: string;
  images: Array<ImageType>;
  name: string;
  tracks: TracksType;
  uri: string;
};
export type TracksType = {
  items: Array<any>;
  limit: number;
  next: string;
  previous: string;
  total: number;
};

// several tracks
export type TrackType = {
  album: AlbumType;
  artists: Array<ArtistType>;
  id: string;
  name: string;
  popularity: number;
  track_number: number;
  type: string;
  uri: string;
};

// Album Tracks
export type AlbumTracksType = {
  href: string;
  items: Array<TrackType>;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

// track recommendations
export type TrackRecommendationsType = {
  tracks: Array<TrackType>;
};

// Search
export type SearchType = {
  tracks: TracksType;
  artists: ArtistType;
  albums: AlbumType;
  playlists: PlaylistType;
};

// search for item type
export type SearchItemsType = {
  tracks: AlbumTracksType;
  albums: AlbumReleasesType;
};
