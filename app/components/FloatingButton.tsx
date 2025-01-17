"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import {
  ArrowUp,
  MessageCircle,
  Send,
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";

// Hooks
function useScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return { isVisible, scrollToTop };
}

// Music Player Component
function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const playlist = [
    { title: "Song 1", artist: "Artist 1" },
    { title: "Song 2", artist: "Artist 2" },
    { title: "Song 3", artist: "Artist 3" },
  ];

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () =>
    setCurrentTrack((prev) => (prev + 1) % playlist.length);

  const prevTrack = () =>
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-72">
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
              className={`p-2 text-sm cursor-pointer ${
                index === currentTrack ? "bg-gray-100 font-bold" : ""
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

// Main Component
export default function FloatingButton() {
  const { isVisible, scrollToTop } = useScrollToTop();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    [{ text: "Hello! How can I help you today?", isUser: false }]
  );
  const [inputMessage, setInputMessage] = useState("");

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, isUser: true }]);
      setInputMessage("");
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "I'm a bot. I can't actually respond intelligently.",
            isUser: false,
          },
        ]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Left Floating Button (Music Player) */}
      <div className="fixed bottom-4 left-4 flex flex-col items-start space-y-2 z-40">
        <AnimatePresence>
          {isMusicOpen && (
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <MusicPlayer />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial="visible"
          animate="visible"
          variants={buttonVariants}
        >
          <Button
            onClick={() => setIsMusicOpen(!isMusicOpen)}
            className="rounded-full p-2"
            variant={isMusicOpen ? "default" : "outline"}
          >
            <Music className="h-6 w-6" />
            <span className="sr-only">Music Player</span>
          </Button>
        </motion.div>
      </div>

      {/* Right Floating Buttons (Chat and Back to Top) */}
      <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-2 z-40">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              className="bg-white p-4 rounded-lg shadow-lg mb-2 w-80 h-96 flex flex-col"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <ScrollArea className="flex-grow mb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${
                      message.isUser ? "text-right" : "text-left"
                    }`}
                  >
                    <span
                      className={`inline-block p-2 rounded-lg ${
                        message.isUser
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {message.text}
                    </span>
                  </div>
                ))}
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="flex">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-grow mr-2"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col items-end space-y-2">
          <AnimatePresence>
            {isVisible && (
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Button
                  onClick={scrollToTop}
                  className="rounded-full p-2"
                  variant="outline"
                >
                  <ArrowUp className="h-6 w-6" />
                  <span className="sr-only">Back to Top</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial="visible"
            animate="visible"
            variants={buttonVariants}
          >
            <Button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="rounded-full p-2"
              variant={isChatOpen ? "default" : "outline"}
            >
              <MessageCircle className="h-6 w-6" />
              <span className="sr-only">Bot Chat</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
