const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "/playlist";
const clientId = "db65b796543848cd832fcc8a143a9f06";

const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "playlist-read-private",
  "playlist-modify-public",
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}`;

// loginUrl = "https://accounts.spotify.com/authorize?client_id=db65b796543848cd832fcc8a143a9f06&response_type=code&redirect_uri=http://localhost:3001/playlist&scope=streaming%20user-read-email%20user-read-private"
