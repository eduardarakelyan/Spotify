import { DELETE, GET, POST, PUT } from "./request";

const prefix = "https://api.spotify.com";
export const getAlbum = GET(({ id }) => prefix + `/v1/albums/${id}`);
export const getToken = POST(`https://accounts.spotify.com/api/token`);
// get new album releases
export const getNewReleases = GET(() => prefix + "/v1/browse/new-releases");

// get album tracks
export const getAlbumTracks = GET(
  ({ id }) => prefix + `/v1/albums/${id}/tracks`
);
// get all artists
export const getAllArtists = GET(() => prefix + "/v1/artists");
// get several tracks
export const getSeveralTracks = GET(() => prefix + "/v1/tracks");

// get single track information
export const getTrack = GET(({ id }) => prefix + `/v1/tracks/${id}`);

// get track recommendations
export const getTrackRecommendations = GET(
  () => prefix + "/v1/recommendations"
);

// create playlist
export const createPlaylist = POST(
  ({ userId }) => prefix + `/v1/users/${userId}/playlists`
);

// get users playlists
export const getUsersPlaylists = GET(
  ({ userId }) => prefix + `/v1/users/${userId}/playlists`
);

// get playlist
export const getPlaylist = GET(
  ({ playlist_id }) => prefix + `/v1/playlists/${playlist_id}`
);

// add items to playlist
export const addItemsToPlaylist = POST(
  ({ playlist_id }) => prefix + `/v1/playlists/${playlist_id}/tracks`
);

// get playlist items
export const getPlaylistItems = GET(
  ({ playlist_id }) => prefix + `/v1/playlists/${playlist_id}/tracks`
);

// remove playlist items
export const removePlaylistItems = DELETE(
  ({ playlist_id }) => prefix + `/v1/playlists/${playlist_id}/tracks`
);

// update playlist items
export const updatePlaylistItems = PUT(
  ({ playlist_id }) => prefix + `/v1/playlists/${playlist_id}/tracks`
);

// remove tracks from current user
export const removeTracksFromCurrentUser = DELETE(
  () => prefix + `/v1/me/tracks`
);

// search for item
export const getSearchForItem = GET(() => prefix + `/v1/search`);
