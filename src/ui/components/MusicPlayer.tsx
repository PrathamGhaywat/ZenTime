import { useEffect, useRef, useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../card";
import { ChevronFirstIcon, ChevronLast, Music, FileMusic, Pause, Play } from "lucide-react";

type Track = {
  name: string;
  path: string;
};

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackError, setPlaybackError] = useState("");

  const currentTrack = tracks[currentIndex];

  // Keep volume and playback synchronized with React state.
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.play().catch((error: unknown) => {
        console.error("Audio playback failed:", error);
        setPlaybackError(
          "Could not play this file. Check the console for details."
        );
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [currentIndex, isPlaying, currentTrack]);

  async function chooseFiles() {
    try {
      const selected = await open({
        multiple: true,
        filters: [
          {
            name: "Audio",
            extensions: [
              "mp3",
              "wav",
              "ogg",
              "m4a",
              "flac",
              "aac",
            ],
          },
        ],
      });

      if (!selected) return;

      const paths = Array.isArray(selected) ? selected : [selected];

      const newTracks: Track[] = paths.map((path) => ({
        path,
        name: path.split(/[\\/]/).pop() ?? path,
      }));

      setTracks(newTracks);
      setCurrentIndex(0);
      setIsPlaying(false);
      setPlaybackError("");
    } catch (error) {
      console.error("Could not select audio files:", error);
      setPlaybackError("Could not open the file picker.");
    }
  }

  function togglePlayback() {
    if (!currentTrack) return;

    setPlaybackError("");
    setIsPlaying((playing) => !playing);
  }

  function changeTrack(index: number) {
    if (tracks.length === 0) return;

    const nextIndex = (index + tracks.length) % tracks.length;

    setPlaybackError("");
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  }

  return (
    <Card className="flex h-full min-h-0 w-full flex-col overflow-hidden">
      <CardHeader className="shrink-0 pb-0">
        <CardTitle className="flex items-center gap-2"><Music /> Music
        {tracks.length > 0 && (
          <div className="flex items-center justify-end px-265 py-2">
            <Button onClick={chooseFiles}><FileMusic /></Button>
          </div>
        )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
        {tracks.length === 0 && (
        <div className="shrink-0">
          <Button onClick={chooseFiles}>
            Choose audio files
          </Button>
        </div>)}


        {currentTrack ? (
          <>
            <audio
              ref={audioRef}
              src={convertFileSrc(currentTrack.path)}
              preload="metadata"
              onEnded={() => changeTrack(currentIndex + 1)}
              onPause={() => setIsPlaying(false)}
              onPlay={() => {
                setPlaybackError("");
                setIsPlaying(true);
              }}
              onError={() => {
                setIsPlaying(false);
                setPlaybackError(
                  "Could not load this audio file. Check the file format and Tauri permissions."
                );
                console.error(
                  "Could not load audio:",
                  currentTrack.path
                );
              }}
            />

            <p className="shrink-0 truncate font-medium" title={currentTrack.name}>
              {currentTrack.name}
            </p>

            <div className="flex shrink-0 items-center gap-2">
              <Button
                variant="outline"
                onClick={() => changeTrack(currentIndex - 1)}
                disabled={tracks.length === 0}
              >
                <ChevronFirstIcon />
              </Button>

              <Button
                onClick={togglePlayback}
                disabled={!currentTrack}
              >
                {isPlaying ? <Pause /> : <Play />}
              </Button>

              <Button
                variant="outline"
                onClick={() => changeTrack(currentIndex + 1)}
                disabled={tracks.length === 0}
              >
                <ChevronLast />
              </Button>
            </div>

            {playbackError && (
              <p
                className="shrink-0 text-sm text-destructive"
                role="alert"
              >
                {playbackError}
              </p>
            )}

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <p className="mb-2 shrink-0 text-sm text-muted-foreground">
                Playlist · {tracks.length} tracks
              </p>

              <div className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain pr-1">
                {tracks.map((track, index) => (
                  <button
                    key={track.path}
                    onClick={() => changeTrack(index)}
                    title={track.name}
                    aria-current={
                      index === currentIndex ? "true" : undefined
                    }
                    className={`w-full truncate rounded-md p-2 text-left text-sm transition-colors hover:bg-accent ${
                      index === currentIndex
                        ? "bg-accent font-medium"
                        : ""
                    }`}
                  >
                    {index === currentIndex && isPlaying ? "♫ " : ""}
                    {track.name}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Choose some audio files to get started.
          </p>
        )}
      </CardContent>
    </Card>
  );
}