// commands.ts
export const help = [
  "whois",
  "projects",
  "social",
  "banner",
  "clear",
  "help",
  "su",
];

export const handleCommand = (command: string): string => {
  const args = command.trim().split(" ");
  let output = "";

  switch (args[0]) {
    case "whois":
      output =
        "Hello guys! I'm a Software Development Enthusiast. Currently, I'm a 4th year informatics student \nat Universitas Multimedia Nusantara. I am incredibly interested in front-end, creative, full-stack, \nand IT Security development. All I am interested in are web, mobile applications, and cyber-security. \nI am currently looking for some opportunities to work with a team. 😍";
      break;
    case "projects":
      output = "1. Project A\n2. Project B\n3. Project C";
      break;
    case "social":
      output =
        "LinkedIn: https://linkedin.com/in/naufal\nGitHub: https://github.com/naufal";
      break;
    case "clear":
      return ""; // Clear command is handled separately in the component
    case "banner":
      output = banner;
      break;
    case "help":
      output = `Available commands: ${help.join(", ")}`;
      break;
    case "su":
      output = "It doesn't do anything now, but it will be soon. 😏";
      break;
    default:
      output = "Command not found. Type 'help' to see available commands.";
  }

  return output;
};

export const banner = `Naufal Syarif, All rights reserved.

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

export const initialMessage = `Booting up the terminal ...
Loading the system ...

Loading initial ramdisk ...

[    0.000000]   Website version 0.0.0.1 (buildd@nextjs) (tailwindcss@3.3.3) (shadcnui) Wed  22 13:40:32 2025
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
