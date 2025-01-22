// MusicPlayer.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { playlist } from "@/app/data/musics"; // Import music playlist

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () =>
    setCurrentTrack((prev) => (prev + 1) % playlist.length);

  const prevTrack = () =>
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);

  return (
    <div className="bg-[#131821]/50 backdrop-blur-lg p-4 rounded-lg shadow-lg w-72 border-[2px] border-[#273344]/50 z-50">
      {" "}
      {/* Add z-50 */}
      <h3 className="font-bold mb-2">Now Playing</h3>
      <p className="text-sm mb-1">{playlist[currentTrack].title}</p>
      <p className="text-xs text-gray-500 mb-4">
        {playlist[currentTrack].artist}
      </p>
      <Slider defaultValue={[33]} max={100} step={1} className="mb-4" />
      <div className="flex justify-between items-center">
        <Button variant="outline" size="icon" onClick={prevTrack}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={togglePlay}>
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button variant="outline" size="icon" onClick={nextTrack}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-32 mt-4">
        <ul>
          {playlist.map((song, index) => (
            <li
              key={index}
              className={`p-2 text-sm cursor-pointer rounded ${
                index === currentTrack ? "bg-[#1c2736] font-bold" : ""
              }`}
              onClick={() => setCurrentTrack(index)}
            >
              {song.title} - {song.artist}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
