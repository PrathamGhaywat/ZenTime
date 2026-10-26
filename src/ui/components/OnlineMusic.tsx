
import { useState } from "react";
import { Music } from "lucide-react";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../card";

type Source = "spotify" | "youtube";

function getSpotifyEmbedUrl(input: string): string | null {
  try {
    const url = new URL(input.trim());

    if (
      !["open.spotify.com", "www.open.spotify.com"].includes(url.hostname)
    ) {
      return null;
    }

    const parts = url.pathname.split("/").filter(Boolean);

    if (
      parts.length < 2 ||
      !["track", "album", "playlist", "artist", "episode", "show"].includes(
        parts[0]
      )
    ) {
      return null;
    }

    return `https://open.spotify.com/embed/${parts[0]}/${parts[1]}`;
  } catch {
    return null;
  }
}

function getYouTubeEmbedUrl(input: string): string | null {
  try {
    const url = new URL(input.trim());
    let videoId = "";
    let playlistId = url.searchParams.get("list");

    if (
      url.hostname === "music.youtube.com" ||
      url.hostname === "www.youtube.com" ||
      url.hostname === "youtube.com"
    ) {
      videoId = url.searchParams.get("v") ?? "";
    } else if (
      url.hostname === "youtu.be" ||
      url.hostname === "www.youtu.be"
    ) {
      videoId = url.pathname.split("/").filter(Boolean)[0] ?? "";
    } else {
      return null;
    }

    // Accept playlist links and individual video links.
    if (playlistId) {
      return `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(
        playlistId
      )}`;
    }

    if (videoId) {
      return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
        videoId
      )}`;
    }

    return null;
  } catch {
    return null;
  }
}

export function OnlineMusic() {
  const [source, setSource] = useState<Source>("spotify");

  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [spotifyEmbed, setSpotifyEmbed] = useState("");
  const [spotifyError, setSpotifyError] = useState("");

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeEmbed, setYoutubeEmbed] = useState("");
  const [youtubeError, setYoutubeError] = useState("");

  function loadSpotify() {
    const embed = getSpotifyEmbedUrl(spotifyUrl);

    if (!embed) {
      setSpotifyError("Paste a valid Spotify track, album, or playlist link.");
      setSpotifyEmbed("");
      return;
    }

    setSpotifyError("");
    setSpotifyEmbed(embed);
  }

  function loadYouTube() {
    const embed = getYouTubeEmbedUrl(youtubeUrl);

    if (!embed) {
      setYoutubeError(
        "Paste a valid YouTube Music playlist link containing a playlist ID."
      );
      setYoutubeEmbed("");
      return;
    }

    setYoutubeError("");
    setYoutubeEmbed(embed);
  }

  return (
    <Card className="flex w-full flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          Online Music
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={source === "spotify" ? "default" : "outline"}
            onClick={() => setSource("spotify")}
          >
            Spotify
          </Button>

          <Button
            variant={source === "youtube" ? "default" : "outline"}
            onClick={() => setSource("youtube")}
          >
            YouTube Music
          </Button>
        </div>

        {source === "spotify" && (
          <div className="space-y-3">
            <form
              className="flex flex-col gap-2 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                loadSpotify();
              }}
            >
              <input
                value={spotifyUrl}
                onChange={(event) => setSpotifyUrl(event.target.value)}
                placeholder="Paste a Spotify playlist or track link"
                aria-label="Spotify link"
                className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              />

              <Button type="submit">Load</Button>
            </form>

            {spotifyError && (
              <p role="alert" className="text-sm text-destructive">
                {spotifyError}
              </p>
            )}

            {spotifyEmbed && (
              <iframe
                key={spotifyEmbed}
                src={spotifyEmbed}
                title="Spotify player"
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl border-0"
              />
            )}
          </div>
        )}

        {source === "youtube" && (
          <div className="space-y-3">
            <form
              className="flex flex-col gap-2 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                loadYouTube();
              }}
            >
              <input
                value={youtubeUrl}
                onChange={(event) => setYoutubeUrl(event.target.value)}
                placeholder="Paste a YouTube Music playlist link"
                aria-label="YouTube Music playlist link"
                className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              />

              <Button type="submit">Load playlist</Button>
            </form>

            {youtubeError && (
              <p role="alert" className="text-sm text-destructive">
                {youtubeError}
              </p>
            )}

            {youtubeEmbed && (
              <iframe
                key={youtubeEmbed}
                src={youtubeEmbed}
                title="YouTube Music playlist"
                width="100%"
                height="352"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="rounded-xl border-0"
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
