"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import "@/styles/fun.css";

interface TodoItem {
  text: string;
  completed: boolean;
}

export default function FunTerminalPage() {
  const [output, setOutput] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState<"default" | "hacker" | "dracula" | "solarized" | "nord">("default");
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [calculatorMode, setCalculatorMode] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Add FontAwesome CDN
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    link.integrity = 'sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const printWelcome = useCallback(() => {
    const asciiArt = `
_   _    _    _   _ ____    _      _  ___   _ __  __    _    ____  
| \\ | |  / \\  | \\ | |  _ \\  / \\    | |/ / | | |  \\/  |  / \\  |  _ \\ 
|  \\| | / _ \\ |  \\| | | | |/ _ \\   | ' /| | | | |\\/| | / _ \\ | |_) |
| |\\  |/ ___ \\| |\\  | |_| / ___ \\  | . \\| |_| | |  | |/ ___ \\|  _ < 
|_| \\_/_/   \\_\\_| \\_|____/_/   \\_\\ |_|\\_\\\\___/|_|  |_|_/   \\_\\_| \\_\\`;

    const lines = [
      asciiArt,
      "",
      "═══════════════════════════════════════════════════════════════",
      "  🚀 Interactive Terminal Portfolio",
      "  👨‍💻 Web Developer | Student | Freelancer",
      "═══════════════════════════════════════════════════════════════",
      "",
      "  Welcome to my interactive terminal!",
      "  Type 'help' to see available commands",
      "",
      "  Quick Links:",
      "  • portfolio  - View my work",
      "  • github    - Visit GitHub",
      "  • linkedin  - Connect on LinkedIn",
      "",
    ];
    
    setOutput(lines);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    printWelcome();
  }, [printWelcome]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const runCalculator = (expr: string): string => {
    try {
      const sanitized = expr.replace(/[^0-9+\-*/().]/g, '');
      if (!sanitized) return "Error: Invalid expression";
      
      const result = Function(`"use strict"; return (${sanitized})`)();
      return `= ${result}`;
    } catch {
      return "Error: Invalid expression";
    }
  };

  const handleCommand = (cmd: string) => {
    if (calculatorMode) {
      if (cmd.toLowerCase() === 'exit') {
        setCalculatorMode(false);
        setOutput(prev => [...prev, `➜ ${cmd}`, "Calculator mode exited.", ""]);
      } else {
        const result = runCalculator(cmd);
        setOutput(prev => [...prev, `➜ ${cmd}`, result, ""]);
      }
      return;
    }
    
    const trimmedCmd = cmd.trim().toLowerCase();
    
    setOutput(prev => [...prev, `➜ ${cmd}`]);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    const commands: Record<string, (cmd?: string) => void> = {
      help: () => {
        setOutput(prev => [...prev, `
Available Commands:
════════════════════════════════════════════════════════════
📌 Basic:
   help        - Show this help message
   clear       - Clear the terminal
   about       - Learn about me
   contact     - Get contact information
   
💼 Professional:
   skills      - View my technical skills
   experience  - Work experience timeline
   education   - Education background
   projects    - View my projects
   services    - What I can do for you
   
🎮 Fun:
   game        - Play a guessing game
   joke        - Get a random joke
   quote       - Get an inspiring quote
   calc        - Calculator (use 'exit' to exit)
   
🔗 Links:
   github      - Visit my GitHub
   linkedin    - Visit my LinkedIn
   twitter     - Visit my Twitter
   portfolio   - Open main portfolio
   terminal    - About this terminal
   
📝 Todo:
   todo add <task>   - Add a todo item
   todo list         - Show todo list
   todo clear        - Clear all todos
`]);
      },
      about: () => {
        setOutput(prev => [...prev, `
╔═══════════════════════════════════════════════════════════════╗
║                        ABOUT ME                                ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Hey there! I'm Nanda Kumar 👋                                ║
║                                                               ║
║  I'm a passionate student and freelancer based in              ║
║  Bangalore, India. Currently pursuing BCA in AI/ML,           ║
║  I run my own startup called Zeridex!                         ║
║                                                               ║
║  🏢 Founder @ Zeridex - Building AI-powered websites          ║
║  💻 Freelance Web Developer                                   ║
║  🎓 BCA Student in AI/ML                                      ║
║  🎬 MCU Fan (Yes, I'm building J.A.R.V.I.S.!)                ║
║                                                               ║
║  I love creating beautiful, functional websites and           ║
║  exploring new technologies. Let's build something           ║
║  amazing together!                                            ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`]);
      },
      skills: () => {
        setOutput(prev => [...prev, `
╔═══════════════════════════════════════════════════════════════╗
║                      TECHNICAL SKILLS                          ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  🎨 Frontend:                                                 ║
║     React.js, Next.js, HTML5, CSS3, Tailwind, Bootstrap       ║
║                                                               ║
║  💻 Languages:                                                ║
║     JavaScript, TypeScript, Python, C, SQL                    ║
║                                                               ║
║  ⚙️ Backend:                                                   ║
║     Node.js, Express.js, Firebase, Convex                     ║
║                                                               ║
║  🛠️ Tools:                                                    ║
║     Git, GitHub, Docker, AWS, Figma                           ║
║                                                               ║
║  🤖 AI/ML:                                                    ║
║     OpenAI API, Automation, Custom Integrations               ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`]);
      },
      experience: () => {
        setOutput(prev => [...prev, `
╔═══════════════════════════════════════════════════════════════╗
║                      WORK EXPERIENCE                           ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  🚀 Founder @ Zeridex (2024 - Present)                       ║
║     Building AI-powered websites and automation systems        ║
║     for businesses worldwide                                  ║
║                                                               ║
║  💻 Freelance Web Developer (2024 - Present)                  ║
║     • gradfast.in - Career guidance platform                  ║
║     • academicexpert.in - Education consultancy              ║
║     • academicseva.org - Student services portal             ║
║     • langoleaf.com - Language learning platform              ║
║                                                               ║
║  🏫 Web Developer @ EduExpert (2024 - Present)               ║
║     Building and maintaining educational platforms            ║
║                                                               ║
║  📚 Spoken English Instructor (2023 - Present)              ║
║     Teaching while managing web development                   ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`]);
      },
      education: () => {
        setOutput(prev => [...prev, `
╔═══════════════════════════════════════════════════════════════╗
║                       EDUCATION                                ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  🎓 BCA - Bachelor of Computer Applications                  ║
║     Artificial Intelligence & Machine Learning                ║
║     Swamy Vivekanada Rural First Grade College               ║
║     Bangalore, India                                         ║
║     2023 - Present                                           ║
║                                                               ║
║  📜 Certifications:                                           ║
║     • Full Stack Web Development                              ║
║     • Python for Data Science                                 ║
║     • React.js Advanced Patterns                              ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`]);
      },
      projects: () => {
        setOutput(prev => [...prev, `
╔═══════════════════════════════════════════════════════════════╗
║                         PROJECTS                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  🏢 Zeridex                                                  ║
║     AI-powered website builder and automation platform        ║
║                                                               ║
║  📚 Academic Expert                                           ║
║     Education consultancy platform                            ║
║                                                               ║
║  📖 Academic Seva                                             ║
║     Student services portal                                   ║
║                                                               ║
║  🎯 GradFast                                                 ║
║     Career guidance platform                                 ║
║                                                               ║
║  🌿 LangoLeaf                                                ║
║     Language learning platform                               ║
║                                                               ║
║  🔗 More projects on GitHub!                                  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`]);
      },
      services: () => {
        setOutput(prev => [...prev, `
╔═══════════════════════════════════════════════════════════════╗
║                        SERVICES                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  🌐 Web Development                                           ║
║     • Custom websites & web apps                             ║
║     • E-commerce solutions                                   ║
║     • Portfolio websites                                     ║
║                                                               ║
║  🎨 UI/UX Design                                              ║
║     • Modern, responsive designs                             ║
║     • Figma to code                                           ║
║     • Brand identity                                          ║
║                                                               ║
║  🤖 AI Integration                                            ║
║     • ChatGPT integrations                                   ║
║     • Automation workflows                                    ║
║     • Custom AI solutions                                     ║
║                                                               ║
║  🔧 Maintenance & Support                                     ║
║     • Website updates                                         ║
║     • Performance optimization                               ║
║     • Bug fixes                                               ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`]);
      },
      contact: () => {
        setOutput(prev => [...prev, `
╔═══════════════════════════════════════════════════════════════╗
║                      CONTACT INFO                              ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  📧 Email:    nandablr242@gmail.com                          ║
║  📱 GitHub:   github.com/crazynanda                          ║
║  💼 LinkedIn: linkedin.com/in/nanda-kumar-544500213        ║
║  🐦 Twitter:  x.com/nandablr242                             ║
║  ☕ Coffee:   buymeacoffee.com/nandakumar                    ║
║                                                               ║
║  Let's build something amazing together! 🚀                  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`]);
      },
      clear: () => {
        setOutput([]);
        return;
      },
      game: () => {
        const number = Math.floor(Math.random() * 100) + 1;
        setOutput(prev => [...prev, `
🎮 Guessing Game!
═══════════════════
I'm thinking of a number between 1 and 100.
Type 'guess <number>' to play!
(Example: guess 50)
`]);
      },
      guess: () => {
        setOutput(prev => [...prev, "Use 'game' command to start a new game!"]);
      },
      joke: () => {
        const jokes = [
          "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
          "Why did the developer go broke? Because he used up all his cache! 💸",
          "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?' 🍺",
          "Why do Java developers wear glasses? Because they can't C#! 👓",
          "There are only 10 types of people in the world: those who understand binary and those who don't. 🔢",
          "What do you call a fake noodle? An impasta! 🍝",
          "Why did the scarecrow become a successful developer? Because he was outstanding in his field! 🌾",
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        setOutput(prev => [...prev, `😂 ${randomJoke}`, ""]);
      },
      quote: () => {
        const quotes = [
          "The best way to predict the future is to create it. - Peter Drucker",
          "Innovation distinguishes between a leader and a follower. - Steve Jobs",
          "Code is like humor. When you have to explain it, it's bad. - Cory House",
          "First, solve the problem. Then, write the code. - John Johnson",
          "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
          "The only way to do great work is to love what you do. - Steve Jobs",
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setOutput(prev => [...prev, `💭 ${randomQuote}`, ""]);
      },
      calc: () => {
        setCalculatorMode(true);
        setOutput(prev => [...prev, `
🧮 Calculator Mode
═══════════════════
Type mathematical expressions to calculate.
Examples: 2+2, 10*5, 100/4, (50-20)/2

Type 'exit' to return to normal mode.
`]);
      },
      todo: (cmd = '') => {
        const parts = cmd.split(' ');
        if (parts[1] === 'add' && parts.slice(2).join(' ')) {
          const newTodo = { text: parts.slice(2).join(' '), completed: false };
          setTodos(prev => [...prev, newTodo]);
          setOutput(prev => [...prev, `✓ Added: "${newTodo.text}"`, ""]);
        } else if (parts[1] === 'list') {
          if (todos.length === 0) {
            setOutput(prev => [...prev, "No todos yet! Add one with 'todo add <task>'", ""]);
          } else {
            const todoList = todos.map((t, i) => `${t.completed ? '✓' : '○'} ${i + 1}. ${t.text}`).join('\n');
            setOutput(prev => [...prev, `📝 Your Todos:\n${todoList}`, ""]);
          }
        } else if (parts[1] === 'clear') {
          setTodos([]);
          setOutput(prev => [...prev, "✓ All todos cleared!", ""]);
        } else {
          setOutput(prev => [...prev, "Usage: todo add <task> | todo list | todo clear", ""]);
        }
      },
      theme: () => {
        const newTheme = theme === "default" ? "hacker" : "default";
        setTheme(newTheme);
        setOutput(prev => [...prev, `Theme changed to: ${newTheme}`, ""]);
      },
      terminal: () => {
        setOutput(prev => [...prev, `
📟 About This Terminal
═══════════════════════════════════════════════════════════════
This is an interactive terminal interface built with React!
You can learn about me, play games, use a calculator, 
and more - all without leaving this page.

Features:
• Learn about my skills and experience
• Play a guessing game
• Get random jokes and quotes
• Use a calculator
• Manage a todo list

Type 'help' to see all commands!
`]);
      },
      portfolio: () => {
        setOutput(prev => [...prev, `
🌐 Opening main portfolio... 
Type 'open https://nandakumar.site' to visit manually!
`, ""]);
        window.open('https://nandakumar.site', '_blank');
      },
      github: () => {
        setOutput(prev => [...prev, `
🐙 Opening GitHub...
`, ""]);
        window.open('https://github.com/crazynanda', '_blank');
      },
      linkedin: () => {
        setOutput(prev => [...prev, `
💼 Opening LinkedIn...
`, ""]);
        window.open('https://www.linkedin.com/in/nanda-kumar-544500213/', '_blank');
      },
      twitter: () => {
        setOutput(prev => [...prev, `
🐦 Opening Twitter/X...
`, ""]);
        window.open('https://x.com/nandablr242', '_blank');
      },
    };

    if (trimmedCmd.startsWith('guess ')) {
      const guess = parseInt(trimmedCmd.split(' ')[1]);
      if (!isNaN(guess)) {
        setOutput(prev => [...prev, `You guessed: ${guess}. Start a new game with 'game' command!`, ""]);
      }
      return;
    }

    if (commands[trimmedCmd]) {
      commands[trimmedCmd]();
    } else if (trimmedCmd.startsWith('todo ')) {
      commands['todo'](cmd);
    } else if (trimmedCmd !== "") {
      setOutput(prev => [...prev, `Command not found: ${cmd}. Type 'help' for available commands.`, ""]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const allCommands = ["help", "clear", "about", "skills", "experience", "education", "projects", "services", "contact", "game", "joke", "quote", "calc", "theme", "terminal", "github", "linkedin", "twitter", "portfolio"];
      const matches = allCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setOutput(prev => [...prev, `Possible commands: ${matches.join("  ")}`, ""]);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="fun-theme" style={{ minHeight: '100vh', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '2rem' }}>
        <div className="loader-wrapper">
          <div className="loader-letter">N</div>
          <div className="loader-letter">K</div>
        </div>
        <div style={{ color: '#66d9ef', fontSize: '1.25rem', fontFamily: 'monospace' }}>
          Loading Terminal...
        </div>
      </div>
    );
  }

  return (
    <div className="fun-theme" style={{ minHeight: '100vh', background: theme === "hacker" ? '#0d0d0d' : '#1a1a1a', padding: '20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/fun" style={{ color: '#66d9ef', textDecoration: 'none', fontFamily: 'monospace', fontSize: '1rem' }}>
            ← Back to Fun Theme
          </Link>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link href="/fun/contact" style={{ 
              background: '#ff6b9d', 
              border: '2px solid #000', 
              padding: '5px 15px', 
              textDecoration: 'none',
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              color: '#000'
            }}>
              Contact
            </Link>
            <button 
              onClick={() => setTheme(theme === "default" ? "hacker" : "default")}
              style={{ 
                background: '#ffd93d', 
                border: '2px solid #000', 
                padding: '5px 15px', 
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontWeight: 'bold'
              }}
            >
              {theme === "default" ? "🌑" : "☀️"} Theme
            </button>
          </div>
        </div>

        {/* Terminal Window */}
        <div style={{ 
          background: theme === "hacker" ? '#0d0d0d' : '#0d1117', 
          border: '3px solid #000', 
          borderRadius: '8px',
          boxShadow: '8px 8px 0 #000',
          overflow: 'hidden',
          fontFamily: "'Space Mono', monospace"
        }}>
          {/* Terminal Header */}
          <div style={{ 
            background: '#ffd93d', 
            padding: '10px 15px', 
            display: 'flex', 
            alignItems: 'center',
            gap: '10px',
            borderBottom: '3px solid #000'
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca40' }}></div>
            </div>
            <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
              terminal — nandakumar@portfolio
            </div>
          </div>

          {/* Terminal Body */}
          <div 
            ref={outputRef}
            style={{ 
              padding: '20px', 
              minHeight: '500px', 
              maxHeight: '600px', 
              overflowY: 'auto',
              color: theme === "hacker" ? '#00ff00' : '#e6edf3',
              fontSize: '14px',
              lineHeight: '1.6'
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {output.map((line, i) => (
              <div key={i} style={{ whiteSpace: 'pre-wrap', marginBottom: '5px' }}>
                {line}
              </div>
            ))}
            
            {/* Input Line */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <span style={{ color: theme === "hacker" ? '#00ff00' : '#66d9ef', marginRight: '10px' }}>➜</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                placeholder={calculatorMode ? "Enter calculation..." : "Type a command..."}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: theme === "hacker" ? '#00ff00' : '#e6edf3',
                  fontFamily: 'inherit',
                  fontSize: 'inherit'
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontFamily: 'monospace', fontSize: '0.85rem' }}>
          <p>Type 'help' to see all commands | Use ↑↓ for history | Tab for autocomplete</p>
          <p>© 2025 Nanda Kumar | Built with Next.js & React</p>
        </div>
      </div>
    </div>
  );
}
