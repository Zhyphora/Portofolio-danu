"use client";

import React, {
  useState,
  useEffect,
  useRef,
  FormEvent,
  KeyboardEvent,
} from "react";
import { motion } from "framer-motion";

// importing terminal commands
import { help } from "@/app/components/Terminal/commands";
import styles from "@/app/components/Terminal/Terminal.module.css";

interface HistoryItem {
  type: "prompt" | "output";
  content: string;
}

interface TerminalProps {
  onBannerComplete?: () => void;
}

const initialMessage = `Booting up the terminal ...
Loading the system ...

Loading initial ramdisk ...

[    0.000000]   Website version 0.0.0.1 (buildd@nextjs) (tailwindcss@3.3.3) (shadcnui) Mon Sep 02 09:24:07 2024
[    0.000000]   Command line: BOOT_IMAGE=/boot/vmlinuz-5.4.0-42-generic root=UUID=abcd1234 ro quiet splash
[    0.000000]   AMD AuthenticAMD
...
[    0.246920] ACPI: Core revision 20200120
...
[ OK ] Started GNOME Display Manager.
[ OK ] Reached target Graphical Interface.

Personal Website 0.0.0.1 LTS

my-machine login: visitor
`;

const banner = `Naufal Syarif, All rights reserved.

           _   _              __      _    _____                  _  __              
          | \\ | |            / _|    | |  / ____|                (_)/ _|             
          |  \\| | __ _ _   _| |_ __ _| | | (___  _   _  __ _ _ __| | |_            
          | . \` |/ _\` | | | |  _/ _\` | |  \\___ \\| | | |/ _\` | '__| |  _|      
          | |\\  | (_| | |_| | || (_| | |  ____) | |_| | (_| | |  | | |            
          |_| \\_|\\__,_|\\__,_|_| \\__,_|_| |_____/ \\__, |\\__,_|_|  |_|_|
                                                  __/ |
                                                  |___/                           

Welcome to my personal website.
For a list of available commands, type 'help'.
`;

export default function Terminal({ onBannerComplete }: TerminalProps) {
  const [terminalInput, setTerminalInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showFullTerminal, setShowFullTerminal] = useState(false);
  const [initialMessageComplete, setInitialMessageComplete] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    setTerminalInput(e.currentTarget.textContent || "");
  };

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(terminalInput);
      setTerminalInput("");
      if (inputRef.current) {
        inputRef.current.textContent = "";
      }
    }
  };

  // Handle commands
  const handleCommand = (command: string) => {
    if (isTyping) return; // Prevent multiple commands at once

    const args = command.trim().split(" ");
    let output = "";

    switch (args[0]) {
      case "whois":
        output =
          "Hello guys! I'm a Software Development Enthusiast. Currently, I'm a 3rd year informatics student \nat Universitas Multimedia Nusantara. I am incredibly interested in front-end, creative, full-stack, \nand IT Security development. All I am interested in are web, mobile applications, and cyber-security. \nI am currently looking for some opportunities to work with a team. 😍";
        break;
      case "projects":
        output = "1. Project A\n2. Project B\n3. Project C";
        break;
      case "social":
        output =
          "LinkedIn: https://linkedin.com/in/naufal\nGitHub: https://github.com/naufal";
        break;
      case "clear":
        setHistory([]);
        return;
      case "banner":
        output = banner;
        break;
      case "help":
        output =
          "Available commands: whois, projects, social, banner, clear, help";
        break;
      case "su":
        output = "it doesn't do anything now, but it will be soon. 😏";
        break;
      default:
        output = "Command not found. Type 'help' to see available commands.";
    }

    // Simulate typing animation
    setIsTyping(true);
    setHistory((prev) => [
      ...prev,
      { type: "prompt", content: `visitor@naufal.me:~$ ${command}` }, // Add the command to history as prompt
      { type: "output", content: "visitor@naufal.me:~$" }, // Add a prompt line above the output
    ]);

    simulateTyping(output, 5, () => {
      setIsTyping(false); // End typing state
    });
  };

  const simulateTyping = (
    text: string,
    speed: number,
    callback: () => void
  ) => {
    let index = 0;
    let currentLine = "";

    const interval = setInterval(() => {
      if (index < text.length) {
        currentLine += text[index];
        setHistory((prev) => [
          ...prev.slice(0, -1),
          { type: "output", content: currentLine },
        ]);
        index++;
      } else {
        clearInterval(interval);
        callback();
      }
    }, speed);
  };

  useEffect(() => {
    setIsTyping(true);
    simulateTyping(initialMessage, 10, () => {
      setIsTyping(false);
      setInitialMessageComplete(true);
      setTimeout(() => {
        setShowFullTerminal(true);
        clearHistoryAndShowBanner();
      }, 1000);
    });
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (!isTyping && showFullTerminal) {
      focusInput();
    }
  }, [isTyping, showFullTerminal]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clearHistoryAndShowBanner = () => {
    setHistory([]);
    setIsTyping(true);
    simulateTyping(banner, 5, () => {
      setIsTyping(false);
      focusInput();
      if (onBannerComplete) {
        onBannerComplete(); // Notify when banner typing is complete
      }
    });
  };

  if (!initialMessageComplete) {
    return (
      <div className="text-white">
        <pre className="whitespace-pre-wrap">{history[0]?.content || ""}</pre>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: showFullTerminal ? 1 : 0,
        scale: showFullTerminal ? 1 : 0.95,
      }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="min-h-64 max-h-auto w-full p-4 border-[2px] border-[#273344] text-slate-200  
        rounded-xl font-mono text-md"
      onClick={focusInput}
    >
      <div className="bg-[#10151D] text-slate-200 font-mono text-md p-4">
        <div className="flex items-center mb-3 space-x-2">
          <div className="w-3 h-3 bg-[#FF6059] rounded-full"></div>
          <div className="w-3 h-3 bg-[#FFBE2F] rounded-full"></div>
          <div className="w-3 h-3 bg-[#29CE42] rounded-full"></div>
        </div>
        <div className="w-full flex items-center justify-center mb-4">
          visitor@naufal.me:~$
        </div>
        <div className="terminal" ref={terminalRef}>
          <div className={`${styles.terminalOutput} ${styles.scrollbar}`}>
            {history.map((item, index) => (
              <div
                key={index}
                className={`pb-2 ${
                  item.type === "output" ? "pl-4" : "text-[#FFA23E]"
                }`}
              >
                {item.type === "output" ? (
                  <pre>{item.content}</pre>
                ) : (
                  item.content
                    .split("\n")
                    .map((line, i) => <div key={i}>{line}</div>)
                )}
              </div>
            ))}
            {!isTyping && (
              <div className="flex items-center">
                <span className="mr-1 text-[#FFA23E]">
                  visitor@naufal.me:~$
                </span>
                <div
                  ref={inputRef}
                  contentEditable={!isTyping}
                  className={`terminal-input bg-transparent text-slate-200 border-none outline-none resize-none font-mono h-6 caret-transparent focus:ring-0 focus:outline-none w-auto min-w-[10px] whitespace-pre-wrap ${
                    isTyping ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onInput={handleInput}
                  onKeyDown={handleEnter}
                  style={{ display: "inline-block" }}
                  spellCheck={false}
                />
                <div className="w-2 h-4 bg-[#C5C5C5] inline-block ml-1 animate-pulse"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
