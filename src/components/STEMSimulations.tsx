import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import BottomNavigation from './BottomNavigation';
import { User } from './types';
import { ChevronLeft, Play, Pause, RotateCcw, Wifi, Zap, Target } from 'lucide-react';

interface STEMSimulationsProps {
  user: User | null;
  navigateToScreen: (screen: string, data?: any) => void;
  language: 'en' | 'hi';
  simulation?: string;
}

const translations = {
  en: {
    simulations: 'STEM Simulations',
    wifiTitle: 'Wi-Fi Signal Propagation',
    projectileTitle: 'Projectile Motion',
    circuitTitle: 'Electric Circuit',
    play: 'Play',
    pause: 'Pause',
    reset: 'Reset',
    angle: 'Launch Angle',
    velocity: 'Initial Velocity',
    frequency: 'Signal Frequency',
    voltage: 'Voltage',
    switchOn: 'Switch ON',
    switchOff: 'Switch OFF',
    distance: 'Distance',
    time: 'Time',
    current: 'Current',
    instructions: 'Instructions',
    wifiInstructions: 'Adjust the frequency to see how Wi-Fi signals spread from the router.',
    projectileInstructions: 'Change the angle and velocity to see different trajectory paths.',
    circuitInstructions: 'Toggle the switch to control current flow in the circuit.',
    meters: 'm',
    seconds: 's',
    degrees: '°',
    hertz: 'GHz',
    volts: 'V',
    amps: 'A'
  },
  hi: {
    simulations: 'STEM सिमुलेशन',
    wifiTitle: 'वाई-फाई सिग्नल प्रसार',
    projectileTitle: 'प्रक्षेप्य गति',
    circuitTitle: 'विद्युत सर्किट',
    play: 'चलाएं',
    pause: 'रुकें',
    reset: 'रीसेट',
    angle: 'प्रक्षेपण कोण',
    velocity: 'प्रारंभिक वेग',
    frequency: 'सिग्नल आवृत्ति',
    voltage: 'वोल्टेज',
    switchOn: 'स्विच चालू',
    switchOff: 'स्विच बंद',
    distance: 'दूरी',
    time: 'समय',
    current: 'धारा',
    instructions: 'निर्देश',
    wifiInstructions: 'देखें कि राउटर से वाई-फाई सिग्नल कैसे फैलते हैं।',
    projectileInstructions: 'कोण और वेग बदलकर अलग पथ देखें।',
    circuitInstructions: 'सर्किट में धारा नियंत्रित करने के लिए स्विच टॉगल करें।',
    meters: 'मी',
    seconds: 'से',
    degrees: '°',
    hertz: 'गीगा',
    volts: 'वो',
    amps: 'ए'
  }
};

const simulationTypes = [
  {
    id: 'wifi',
    titleKey: 'wifiTitle',
    icon: Wifi,
    color: 'from-blue-500 to-cyan-500',
    instructionsKey: 'wifiInstructions'
  },
  {
    id: 'projectile',
    titleKey: 'projectileTitle',
    icon: Target,
    color: 'from-green-500 to-emerald-500',
    instructionsKey: 'projectileInstructions'
  },
  {
    id: 'circuit',
    titleKey: 'circuitTitle',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    instructionsKey: 'circuitInstructions'
  }
];

export default function STEMSimulations({ user, navigateToScreen, language, simulation }: STEMSimulationsProps) {
  const [selectedSim, setSelectedSim] = useState(simulation || 'wifi');
  const [isPlaying, setIsPlaying] = useState(false);
  
  // WiFi Simulation State
  const [wifiFrequency, setWifiFrequency] = useState([2.4]);
  const [wifiWaves, setWifiWaves] = useState<Array<{id: number, radius: number, opacity: number}>>([]);
  
  // Projectile Simulation State
  const [angle, setAngle] = useState([45]);
  const [velocity, setVelocity] = useState([20]);
  const [projectilePosition, setProjectilePosition] = useState({ x: 0, y: 0 });
  const [trajectory, setTrajectory] = useState<Array<{x: number, y: number}>>([]);
  
  // Circuit Simulation State
  const [voltage, setVoltage] = useState([12]);
  const [switchOn, setSwitchOn] = useState(false);
  const [currentFlow, setCurrentFlow] = useState(0);

  const t = translations[language];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && selectedSim === 'wifi') {
      interval = setInterval(() => {
        setWifiWaves(prev => {
          const newWaves = prev
            .map(wave => ({
              ...wave,
              radius: wave.radius + 2,
              opacity: Math.max(0, wave.opacity - 0.02)
            }))
            .filter(wave => wave.opacity > 0);
          
          if (Math.random() > 0.7) {
            newWaves.push({
              id: Date.now(),
              radius: 0,
              opacity: 1
            });
          }
          
          return newWaves;
        });
      }, 50);
    }
    
    if (isPlaying && selectedSim === 'projectile') {
      let time = 0;
      interval = setInterval(() => {
        time += 0.1;
        const g = 9.8;
        const angleRad = (angle[0] * Math.PI) / 180;
        const vx = velocity[0] * Math.cos(angleRad);
        const vy = velocity[0] * Math.sin(angleRad);
        
        const x = vx * time;
        const y = vy * time - 0.5 * g * time * time;
        
        if (y >= 0) {
          setProjectilePosition({ x: x * 10, y: 150 - y * 10 });
          setTrajectory(prev => [...prev, { x: x * 10, y: 150 - y * 10 }]);
        } else {
          setIsPlaying(false);
        }
      }, 50);
    }
    
    if (isPlaying && selectedSim === 'circuit') {
      interval = setInterval(() => {
        setCurrentFlow(prev => switchOn ? (prev + 1) % 100 : 0);
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, selectedSim, angle, velocity, switchOn]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setWifiWaves([]);
    setProjectilePosition({ x: 0, y: 0 });
    setTrajectory([]);
    setCurrentFlow(0);
  };

  const renderWiFiSimulation = () => (
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl overflow-hidden border-2 border-blue-200">
      {/* Router */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
        <Wifi className="w-5 h-5 text-white" />
      </div>
      
      {/* Device */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-6 h-6 bg-gray-600 rounded" />
      
      {/* WiFi Waves */}
      {wifiWaves.map(wave => (
        <motion.div
          key={wave.id}
          className="absolute top-1/2 left-8 transform -translate-y-1/2 border-2 border-blue-400 rounded-full"
          style={{
            width: wave.radius * 2,
            height: wave.radius * 2,
            marginLeft: -wave.radius,
            marginTop: -wave.radius,
            opacity: wave.opacity,
            borderColor: `rgba(59, 130, 246, ${wave.opacity})`
          }}
        />
      ))}
      
      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-3 rounded-lg">
        <label className="block text-sm mb-2">{t.frequency}: {wifiFrequency[0]} {t.hertz}</label>
        <Slider
          value={wifiFrequency}
          onValueChange={setWifiFrequency}
          min={2.4}
          max={5.0}
          step={0.1}
          className="w-full"
        />
      </div>
    </div>
  );

  const renderProjectileSimulation = () => (
    <div className="relative w-full h-64 bg-gradient-to-b from-sky-200 to-green-200 rounded-xl overflow-hidden border-2 border-green-200">
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-600" />
      
      {/* Cannon */}
      <div className="absolute bottom-4 left-8 w-6 h-6 bg-gray-800 rounded-full" />
      
      {/* Trajectory Path */}
      <svg className="absolute inset-0 w-full h-full">
        <path
          d={trajectory.length > 1 ? `M ${trajectory.map(p => `${p.x + 32},${p.y}`).join(' L ')}` : ''}
          stroke="rgba(34, 197, 94, 0.6)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
        />
      </svg>
      
      {/* Projectile */}
      <motion.div
        className="absolute w-3 h-3 bg-red-500 rounded-full"
        style={{
          left: projectilePosition.x + 32,
          top: projectilePosition.y
        }}
      />
      
      {/* Controls */}
      <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg space-y-2">
        <div>
          <label className="block text-xs mb-1">{t.angle}: {angle[0]}{t.degrees}</label>
          <Slider value={angle} onValueChange={setAngle} min={0} max={90} className="w-24" />
        </div>
        <div>
          <label className="block text-xs mb-1">{t.velocity}: {velocity[0]} m/s</label>
          <Slider value={velocity} onValueChange={setVelocity} min={5} max={50} className="w-24" />
        </div>
      </div>
    </div>
  );

  const renderCircuitSimulation = () => (
    <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-300 p-4">
      {/* Battery */}
      <div className="absolute top-8 left-8 w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs">
        {voltage[0]}V
      </div>
      
      {/* Wires */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Top wire */}
        <line x1="80" y1="40" x2="240" y2="40" stroke="#4B5563" strokeWidth="4" />
        {/* Right wire */}
        <line x1="240" y1="40" x2="240" y2="120" stroke="#4B5563" strokeWidth="4" />
        {/* Bottom wire */}
        <line x1="240" y1="120" x2="80" y2="120" stroke="#4B5563" strokeWidth="4" />
        {/* Left wire */}
        <line x1="80" y1="120" x2="80" y2="56" stroke="#4B5563" strokeWidth="4" />
        
        {/* Current flow animation */}
        {switchOn && (
          <motion.circle
            r="3"
            fill="#EAB308"
            animate={{ 
              offsetDistance: ['0%', '100%'],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{
              offsetPath: 'path("M 80 40 L 240 40 L 240 120 L 80 120 L 80 40")',
            }}
          />
        )}
      </svg>
      
      {/* Light Bulb */}
      <div className={`absolute top-12 right-12 w-8 h-8 rounded-full border-2 ${
        switchOn ? 'bg-yellow-400 border-yellow-500' : 'bg-gray-200 border-gray-400'
      } flex items-center justify-center`}>
        💡
      </div>
      
      {/* Switch */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <Button
          onClick={() => setSwitchOn(!switchOn)}
          className={`w-16 h-8 ${switchOn ? 'bg-green-500' : 'bg-gray-400'}`}
        >
          {switchOn ? 'ON' : 'OFF'}
        </Button>
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg">
        <label className="block text-xs mb-1">{t.voltage}: {voltage[0]} {t.volts}</label>
        <Slider value={voltage} onValueChange={setVoltage} min={1} max={24} className="w-24" />
      </div>
    </div>
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 border-b border-gray-200"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen('student-dashboard')}
            className="p-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl">{t.simulations}</h1>
        </div>

        {/* Simulation Selector */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {simulationTypes.map((sim) => {
            const Icon = sim.icon;
            return (
              <Button
                key={sim.id}
                variant={selectedSim === sim.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setSelectedSim(sim.id);
                  resetSimulation();
                }}
                className="whitespace-nowrap rounded-full flex items-center space-x-1"
              >
                <Icon className="w-4 h-4" />
                <span>{t[sim.titleKey as keyof typeof t]}</span>
              </Button>
            );
          })}
        </div>
      </motion.div>

      <div className="p-4 space-y-4">
        {/* Instructions */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="text-sm mb-2">{t.instructions}</h3>
          <p className="text-sm text-gray-700">
            {t[simulationTypes.find(s => s.id === selectedSim)?.instructionsKey as keyof typeof t]}
          </p>
        </Card>

        {/* Simulation Display */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSim}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {selectedSim === 'wifi' && renderWiFiSimulation()}
              {selectedSim === 'projectile' && renderProjectileSimulation()}
              {selectedSim === 'circuit' && renderCircuitSimulation()}
            </motion.div>
          </AnimatePresence>
        </Card>

        {/* Control Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                {t.pause}
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {t.play}
              </>
            )}
          </Button>
          
          <Button variant="outline" onClick={resetSimulation}>
            <RotateCcw className="w-4 h-4 mr-2" />
            {t.reset}
          </Button>
        </div>
      </div>

      <BottomNavigation 
        activeScreen="simulations" 
        onNavigate={navigateToScreen} 
        user={user}
      />
    </div>
  );
}