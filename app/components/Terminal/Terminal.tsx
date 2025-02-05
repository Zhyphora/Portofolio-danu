"use client";

import React, {
  useState,
  useEffect,
  useRef,
  FormEvent,
  KeyboardEvent,
} from "react";
import { motion } from "framer-motion";
import Linkify from "react-linkify"; // For detecting and making links clickable
import {
  handleCommand,
  banner,
  initialMessage,
  help,
} from "../../data/commands"; // Import help for autocomplete
import styles from "@/app/components/Terminal/Terminal.module.css";

interface HistoryItem {
  type: "prompt" | "output";
  content: string;
}

interface TerminalProps {
  onBannerComplete?: () => void;
}

export default function Terminal({ onBannerComplete }: TerminalProps) {
  const [terminalInput, setTerminalInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showFullTerminal, setShowFullTerminal] = useState(false);
  const [initialMessageComplete, setInitialMessageComplete] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]); // Store command history
  const [historyIndex, setHistoryIndex] = useState<number>(-1); // Track current position in history
  const inputRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLPreElement | null>(null); // Correct type for <pre>
  // Change to HTMLDivElement

  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    setTerminalInput(e.currentTarget.textContent || "");
    if (inputRef.current) {
      moveCaretToEnd(inputRef.current);
    }
  };

  const handleEnter = async (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await executeCommand(terminalInput);
      setTerminalInput("");
      if (inputRef.current) {
        inputRef.current.textContent = "";
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      let newIndex = historyIndex;

      if (e.key === "ArrowUp" && newIndex < commandHistory.length - 1) {
        newIndex += 1;
      } else if (e.key === "ArrowDown" && newIndex > 0) {
        newIndex -= 1;
      }

      if (newIndex !== historyIndex) {
        setHistoryIndex(newIndex);
        const command =
          commandHistory[commandHistory.length - 1 - newIndex] || "";
        setTerminalInput(command);
        if (inputRef.current) {
          inputRef.current.textContent = command;
          moveCaretToEnd(inputRef.current);
          inputRef.current.focus();
        }
      }
    }

    // Tab completion
    if (e.key === "Tab") {
      e.preventDefault();
      const input = terminalInput.trim();
      if (input) {
        const matchedCommand = help.find((cmd) => cmd.startsWith(input));
        if (matchedCommand) {
          setTerminalInput(matchedCommand);
          if (inputRef.current) {
            inputRef.current.textContent = matchedCommand;
            moveCaretToEnd(inputRef.current);
            inputRef.current.focus();
          }
        }
      }
    }
  };

  // Helper function to move the caret to the end of the content
  const moveCaretToEnd = (element: HTMLElement) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false); // Move caret to the end
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const executeCommand = async (command: string) => {
    if (isTyping) return; // Prevent multiple commands at once

    if (command.trim() === "clear") {
      setHistory([]);
      return;
    }

    // Add command to history
    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(-1); // Reset history index after executing a new command

    const output = await handleCommand(command); // Await the handleCommand function

    // Simulate typing animation
    setIsTyping(true);
    setHistory((prev) => [
      ...prev,
      { type: "prompt", content: `visitor@naufal.me:~$ ${command}` }, // Add the command to history as prompt
      { type: "output", content: "" }, // Start with empty output
    ]);

    simulateTyping(output, 10, () => {
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

        // Move caret to the end of the output
        if (outputRef.current) {
          outputRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
          moveCaretToEnd(outputRef.current);
        }
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // Scroll the terminal to the bottom when content changes
      terminalRef.current?.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history, terminalInput]);

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
      className="w-full max-w-full p-4 bg-[#131821] border-[2px] border-[#273344] text-slate-200 rounded-xl font-mono text-md"
      onClick={focusInput}
    >
      <div className="bg-[#131821] text-slate-200 font-mono text-md">
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#273344]">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#FF6059] rounded-full"></div>
            <div className="w-3 h-3 bg-[#FFBE2F] rounded-full"></div>
            <div className="w-3 h-3 bg-[#29CE42] rounded-full"></div>
          </div>
          <div className="text-sm text-slate-400">Terminal</div>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>

        {/* Terminal Content */}
        <div
          className="terminal overflow-y-auto max-h-[60vh]"
          ref={terminalRef}
          style={{ maxWidth: "100%" }}
        >
          <div className={`${styles.terminalOutput} ${styles.scrollbar} pb-2`}>
            {history.map((item, index) => (
              <div
                key={index}
                className={`pb-2 ${
                  item.type === "output" ? "pl-4" : "text-[#FFA23E]"
                }`}
              >
                {item.type === "output" ? (
                  <Linkify
                    componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a
                        href={decoratedHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FFA23E] hover:text-[#FF8C0D] underline transition-colors"
                      >
                        {decoratedText}
                      </a>
                    )}
                  >
                    <pre
                      ref={index === history.length - 1 ? outputRef : null}
                      className="whitespace-pre-wrap break-words"
                    >
                      {item.content}
                    </pre>
                  </Linkify>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-[#10B981]">❯</span>
                    <span>{item.content}</span>
                  </div>
                )}
              </div>
            ))}
            {!isTyping && (
              <div className="flex items-center">
                <span className="text-[#10B981]">❯</span>
                <div className="flex items-center">
                  <div
                    ref={inputRef}
                    contentEditable={!isTyping}
                    className="terminal-input bg-transparent text-slate-200 outline-none font-mono px-2 whitespace-pre inline-block"
                    onInput={handleInput}
                    onKeyDown={(e) => {
                      handleEnter(e);
                      handleKeyDown(e);
                    }}
                    spellCheck={false}
                  />
                  <div className="w-2 h-5 bg-[#FFA23E] animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
