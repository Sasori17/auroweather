"use client"

import { motion } from "framer-motion"
import type { WeatherType } from "@/components/ui/weather-widget"

interface WeatherBackgroundProps {
  weatherType: WeatherType
  isDay: boolean
}

export function WeatherBackground({ weatherType, isDay }: WeatherBackgroundProps) {
  // Background gradient based on weather and time of day
  const getBackgroundGradient = () => {
    if (!isDay) {
      return "from-indigo-950 via-purple-900 to-slate-900"
    }

    switch (weatherType) {
      case 'clear':
        return "from-sky-300 via-blue-200 to-indigo-200"
      case 'clouds':
        return "from-slate-300 via-gray-200 to-zinc-200"
      case 'rain':
        return "from-blue-400 via-slate-300 to-gray-300"
      case 'snow':
        return "from-blue-100 via-white to-slate-100"
      case 'thunderstorm':
        return "from-purple-400 via-violet-300 to-indigo-300"
      case 'mist':
        return "from-gray-200 via-slate-200 to-zinc-100"
      default:
        return "from-slate-200 via-blue-100 to-indigo-100"
    }
  }

  // Rain animation (reduced and slower)
  const RainEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-8 bg-blue-400/15"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 100}px`,
          }}
          animate={{
            y: ["0vh", "100vh"],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: Math.random() * 1 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )

  // Snow animation (reduced and slower)
  const SnowEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 100}px`,
          }}
          animate={{
            y: ["0vh", "100vh"],
            x: [0, Math.random() * 50 - 25],
            rotate: [0, 180],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )

  // Stars animation for night (slower and more subtle)
  const StarsEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )

  // Clouds animation (slower and more subtle)
  const CloudsEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${Math.random() * 60}%`,
            left: `-10%`,
          }}
          animate={{
            x: ["0vw", "110vw"],
          }}
          transition={{
            duration: Math.random() * 30 + 60,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        >
          <div
            className="bg-white/10 rounded-full blur-xl"
            style={{
              width: `${Math.random() * 200 + 150}px`,
              height: `${Math.random() * 60 + 40}px`,
            }}
          />
        </motion.div>
      ))}
    </div>
  )

  // Lightning effect for thunderstorm (much more subtle)
  const LightningEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-white"
        animate={{
          opacity: [0, 0, 0.3, 0, 0.2, 0, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatDelay: Math.random() * 8 + 8,
          ease: "easeInOut",
        }}
      />
    </div>
  )

  // Mist effect (slower and more subtle)
  const MistEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gray-300/15 rounded-full blur-3xl"
          style={{
            width: `${Math.random() * 400 + 300}px`,
            height: `${Math.random() * 200 + 150}px`,
            top: `${Math.random() * 100}%`,
            left: `-20%`,
          }}
          animate={{
            x: ["0vw", "120vw"],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: Math.random() * 20 + 40,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )

  // Sun rays for clear day (much slower rotation)
  const SunRaysEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 180,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-96 bg-gradient-to-b from-yellow-200/10 to-transparent"
            style={{
              left: '50%',
              transformOrigin: 'top',
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </motion.div>
    </div>
  )

  return (
    <motion.div
      className={`fixed inset-0 bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 -z-10`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Weather-specific effects */}
      {weatherType === 'rain' && <RainEffect />}
      {weatherType === 'snow' && <SnowEffect />}
      {weatherType === 'thunderstorm' && (
        <>
          <RainEffect />
          <LightningEffect />
        </>
      )}
      {weatherType === 'clouds' && <CloudsEffect />}
      {weatherType === 'mist' && <MistEffect />}
      {weatherType === 'clear' && isDay && <SunRaysEffect />}
      {!isDay && <StarsEffect />}
    </motion.div>
  )
}
