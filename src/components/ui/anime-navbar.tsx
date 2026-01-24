"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  defaultActive?: string
}

export function AnimeNavBar({ items, className, defaultActive = "Home" }: NavBarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>(defaultActive)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999]" style={{ top: '5rem' }}>
      <motion.div 
        className="flex items-center gap-8 bg-black/50 border border-white/10 backdrop-blur-lg py-3 px-12 rounded-full shadow-2xl relative overflow-visible w-max max-w-[90vw]"
        style={{ display: 'flex', gap: '2rem' }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name
          const isHovered = hoveredTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab(item.name)
                const element = document.querySelector(item.url)
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
              onMouseEnter={() => setHoveredTab(item.name)}
              onMouseLeave={() => setHoveredTab(null)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 overflow-visible whitespace-nowrap flex-shrink-0",
                "text-white/70 hover:text-white",
                isActive && "text-white"
              )}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.03, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="absolute inset-0 bg-primary/25 rounded-full blur-md" />
                  <div className="absolute inset-[-4px] bg-primary/20 rounded-full blur-xl" />
                  <div className="absolute inset-[-8px] bg-primary/15 rounded-full blur-2xl" />
                  <div className="absolute inset-[-12px] bg-primary/5 rounded-full blur-3xl" />
                  
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                    style={{
                      animation: "shine 3s ease-in-out infinite"
                    }}
                  />
                </motion.div>
              )}

              {/* Desktop: Show Text */}
              {!isMobile && (
                <motion.span
                  className="relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
              )}

              {/* Mobile: Show Icon */}
              {isMobile && (
                <motion.span 
                  className="relative z-10 block"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={18} strokeWidth={2.5} />
                </motion.span>
              )}
        
              <AnimatePresence>
                {isHovered && !isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                  />
                )}
              </AnimatePresence>

              {isActive && (
                <motion.div
                  layoutId="anime-mascot"
                  className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 overflow-visible"
                  style={{ opacity: 1, display: 'block' }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="relative w-12 h-12">
                    {/* Neck */}
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-4 h-4 -translate-x-1/2"
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="w-full h-full bg-white rotate-45" />
                    </motion.div>

                    {/* Head */}
                    <motion.div
                      className="absolute w-10 h-10 bg-white rounded-full left-1/2 -translate-x-1/2 shadow-sm"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {/* Eyes */}
                      <div className="absolute w-2 h-2 bg-black rounded-full" style={{ left: '25%', top: '40%' }} />
                      <div className="absolute w-2 h-2 bg-black rounded-full" style={{ right: '25%', top: '40%' }} />
                      
                      {/* Cheeks */}
                      <div className="absolute w-2 h-1.5 bg-pink-300 rounded-full opacity-60" style={{ left: '15%', top: '55%' }} />
                      <div className="absolute w-2 h-1.5 bg-pink-300 rounded-full opacity-60" style={{ right: '15%', top: '55%' }} />
                      
                      {/* Mouth */}
                      <div 
                        className="absolute w-4 h-2 border-b-2 border-black rounded-full left-1/2 -translate-x-1/2" 
                        style={{ top: '55%' }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </motion.div>
    </div>
  )
}
