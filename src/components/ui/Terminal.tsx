"use client";

import { useState, useEffect } from 'react';

interface TerminalProps {
  className?: string;
}

const commands = {
  help: `Available commands:
- help        Show this help message
- projects    View portfolio projects
- about       Show developer information
- skills      Display technical skills
- contact     Show contact information
- clear       Clear terminal
- whoami      Current user information
- date        Show current date and time`,
  projects: "Navigating to projects...",
  about: "Navigating to about section...",
  skills: "Navigating to skills section...",
  contact: "Navigating to contact section...",
  clear: "",
  whoami: "nanda_kumar (Stark Industries Web Developer)",
  date: () => new Date().toLocaleString(),
};

export default function Terminal({ className = "" }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'STARK TERMINAL v1.0.0' },
    { type: 'system', content: 'Type "help" for available commands' },
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && e.ctrlKey) {
        // Terminal toggle could be implemented here
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    setHistory(prev => [...prev, { type: 'user', content: `$ ${cmd}` }]);

    const command = commands[trimmedCmd as keyof typeof commands];
    if (command) {
      const response = typeof command === 'function'
        ? command()
        : command;

      if (trimmedCmd === 'clear') {
        setHistory([
          { type: 'system', content: 'STARK TERMINAL v1.0.0' },
          { type: 'system', content: 'Type "help" for available commands' },
        ]);
      } else if (['projects', 'about', 'skills', 'contact'].includes(trimmedCmd)) {
        setHistory(prev => [...prev, { type: 'system', content: response }]);
        setTimeout(() => {
          const section = document.querySelector(`#${trimmedCmd}`);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1000);
      } else {
        setHistory(prev => [...prev, { type: 'system', content: response }]);
      }
    } else if (cmd) {
      setHistory(prev => [...prev, { type: 'error', content: `Command not found: ${cmd}` }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className={`bg-stark-black/95 border border-arc-reactor/30 rounded-lg overflow-hidden backdrop-blur-sm font-mono text-sm ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-stark-dark/80 border-b border-arc-reactor/20">
        <div className="w-2 h-2 rounded-full bg-stark-red/80"></div>
        <div className="w-2 h-2 rounded-full bg-stark-gold/80"></div>
        <div className="w-2 h-2 rounded-full bg-arc-reactor/80"></div>
        <div className="ml-auto text-arc-reactor/70 text-xs">
          TERMINAL
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-96 overflow-y-auto">
        {history.map((line, index) => (
          <div key={index} className={`mb-1 ${
            line.type === 'user' ? 'text-stark-red' : 
            line.type === 'error' ? 'text-stark-red' : 'text-arc-reactor'
          }`}>
            {line.content.split('\n').map((part, i) => (
              <div key={i}>{part}</div>
            ))}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-stark-red">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-arc-reactor focus:ring-0"
            placeholder="Type command..."
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
