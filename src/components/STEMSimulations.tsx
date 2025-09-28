import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import BottomNavigation from './BottomNavigation';
import { User } from './types';
import { ChevronLeft, Play, Pause, RotateCcw, Wifi, Zap, Target, Atom, Plus, Minus } from 'lucide-react';

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
    atomTitle: 'Atom Builder',
    play: 'Play',
    pause: 'Pause',
    reset: 'Reset',
    angle: 'Launch Angle',
    velocity: 'Initial Velocity',
    frequency: 'Signal Frequency',
    voltage: 'Voltage',
    addOrbit: 'Add Orbit',
    removeOrbit: 'Remove Orbit',
    addElectron: 'Add Electron',
    removeElectron: 'Remove Electron',
    orbits: 'Orbits',
    electrons: 'Electrons',
    switchOn: 'Switch ON',
    switchOff: 'Switch OFF',
    distance: 'Distance',
    time: 'Time',
    current: 'Current',
    instructions: 'Instructions',
    wifiInstructions: 'Adjust the frequency to see how Wi-Fi signals spread from the router.',
    projectileInstructions: 'Change the angle and velocity to see different trajectory paths.',
    circuitInstructions: 'Toggle the switch to control current flow in the circuit.',
    atomInstructions: 'Build and customize atoms by adding/removing orbits and electrons.',
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
    atomTitle: 'परमाणु निर्माता',
    play: 'चलाएं',
    pause: 'रुकें',
    reset: 'रीसेट',
    angle: 'प्रक्षेपण कोण',
    velocity: 'प्रारंभिक वेग',
    frequency: 'सिग्नल आवृत्ति',
    voltage: 'वोल्टेज',
    addOrbit: 'कक्षा जोड़ें',
    removeOrbit: 'कक्षा हटाएं',
    addElectron: 'इलेक्ट्रॉन जोड़ें',
    removeElectron: 'इलेक्ट्रॉन हटाएं',
    orbits: 'कक्षाएं',
    electrons: 'इलेक्ट्रॉन',
    switchOn: 'स्विच चालू',
    switchOff: 'स्विच बंद',
    distance: 'दूरी',
    time: 'समय',
    current: 'धारा',
    instructions: 'निर्देश',
    wifiInstructions: 'देखें कि राउटर से वाई-फाई सिग्नल कैसे फैलते हैं।',
    projectileInstructions: 'कोण और वेग बदलकर अलग पथ देखें।',
    circuitInstructions: 'सर्किट में धारा नियंत्रित करने के लिए स्विच टॉगल करें।',
    atomInstructions: 'कक्षाओं और इलेक्ट्रॉनों को जोड़कर/हटाकर परमाणु बनाएं और अनुकूलित करें।',
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
  },
  {
    id: 'atom',
    titleKey: 'atomTitle',
    icon: Atom,
    color: 'from-purple-500 to-pink-500',
    instructionsKey: 'atomInstructions'
  },
];

export default function STEMSimulations({ user, navigateToScreen, language, simulation }: STEMSimulationsProps) {
  const [selectedSim, setSelectedSim] = useState(simulation || 'wifi');
  const [isPlaying, setIsPlaying] = useState(false);
  
  // WiFi Simulation State
  const [wifiFrequency, setWifiFrequency] = useState([2.4]);
  const [wifiStrength, setWifiStrength] = useState([50]);
  const [wifiChannels, setWifiChannels] = useState([6]);
  const [wifiWaves, setWifiWaves] = useState<Array<{id: number, radius: number, opacity: number, type: 'data' | 'ack' | 'beacon', data?: string, x: number, y: number, angle: number, speed: number, targetX: number, targetY: number, lifetime: number}>>([]);
  const [devices, setDevices] = useState([
    { id: 1, x: 100, y: 150, connected: true, signalStrength: 0, lastSeen: 0 },
    { id: 2, x: 200, y: 200, connected: false, signalStrength: 0, lastSeen: 0 },
    { id: 3, x: 300, y: 100, connected: false, signalStrength: 0, lastSeen: 0 }
  ]);
  const [networkTraffic, setNetworkTraffic] = useState<Array<{type: 'data' | 'ack', from: number, to: number, size: number, progress: number}>>([]);
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);
  
  // Projectile Simulation State
  const [angle, setAngle] = useState([45]);
  const [velocity, setVelocity] = useState([20]);
  const [projectilePosition, setProjectilePosition] = useState({ x: 0, y: 0 });
  const [trajectory, setTrajectory] = useState<Array<{x: number, y: number}>>([]);
  
  // Circuit Simulation State
  const [voltage, setVoltage] = useState([12]);
  const [switchOn, setSwitchOn] = useState(false);
  const [currentFlow, setCurrentFlow] = useState(0);
  
  // Atom Simulation State
  const [orbits, setOrbits] = useState(1);
  const [electrons, setElectrons] = useState([2]); // Electrons per orbit
  const [electronAngles, setElectronAngles] = useState<number[][]>([[0, 0]]); // Angles for each electron in each orbit

  const t = translations[language];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && selectedSim === 'wifi') {
      interval = setInterval(() => {
        const now = Date.now();
        
        // Update existing waves
        setWifiWaves(prev => {
          return prev
            .map(wave => {
              const newRadius = wave.radius + wave.speed;
              const progress = Math.min(1, newRadius / 200);
              const newX = wave.x + Math.cos(wave.angle) * wave.speed;
              const newY = wave.y + Math.sin(wave.angle) * wave.speed;
              
              // Check if wave reached its target
              if (wave.type === 'data' || wave.type === 'ack') {
                const distanceToTarget = Math.sqrt(
                  Math.pow(wave.targetX - newX, 2) + 
                  Math.pow(wave.targetY - newY, 2)
                );
                
                if (distanceToTarget < 20) {
                  // Wave reached its target
                  if (wave.type === 'data') {
                    // Send ACK back
                    setTimeout(() => {
                      const targetDevice = devices.find(d => d.id === (wave as any).from);
                      if (targetDevice) {
                        setWifiWaves(prev => [...prev, {
                          id: Date.now() + Math.random(),
                          type: 'ack',
                          x: wave.targetX,
                          y: wave.targetY,
                          targetX: targetDevice.x,
                          targetY: targetDevice.y,
                          angle: Math.atan2(
                            targetDevice.y - wave.targetY,
                            targetDevice.x - wave.targetX
                          ),
                          speed: 3,
                          radius: 0,
                          opacity: 1,
                          lifetime: 1000
                        }]);
                      }
                    }, 100);
                  }
                  return null;
                }
              }
              
              return {
                ...wave,
                radius: newRadius,
                x: newX,
                y: newY,
                opacity: Math.max(0, 1 - (now - wave.lifetime * 1000) / 2000),
                lifetime: wave.lifetime - 0.05
              };
            })
            .filter(wave => wave !== null && wave.opacity > 0) as any;
        });
        
        // Generate new waves
        if (Math.random() > 0.95) {
          // Randomly select a device to send data
          const connectedDevices = devices.filter(d => d.connected);
          if (connectedDevices.length > 0) {
            const fromDevice = connectedDevices[Math.floor(Math.random() * connectedDevices.length)];
            const toDevice = devices[Math.floor(Math.random() * devices.length)];
            
            if (fromDevice.id !== toDevice.id) {
              const angle = Math.atan2(
                toDevice.y - fromDevice.y,
                toDevice.x - fromDevice.x
              );
              
              setWifiWaves(prev => [...prev, {
                id: Date.now() + Math.random(),
                type: 'data',
                data: `Packet ${Math.floor(Math.random() * 1000)}`,
                x: fromDevice.x,
                y: fromDevice.y,
                targetX: toDevice.x,
                targetY: toDevice.y,
                angle,
                speed: 2,
                radius: 0,
                opacity: 1,
                from: fromDevice.id,
                to: toDevice.id,
                lifetime: 1000
              }]);
              
              // Update network traffic
              setNetworkTraffic(prev => [...prev, {
                type: 'data',
                from: fromDevice.id,
                to: toDevice.id,
                size: Math.floor(Math.random() * 1000) + 500,
                progress: 0
              }]);
            }
          }
        }
        
        // Update network traffic progress
        setNetworkTraffic(prev => 
          prev
            .map(traffic => ({
              ...traffic,
              progress: Math.min(1, traffic.progress + 0.02)
            }))
            .filter(traffic => traffic.progress < 1.5)
        );
        
        // Update device signal strengths
        setDevices(prev => 
          prev.map(device => {
            // Calculate distance to router (center at 80,150)
            const distance = Math.sqrt(Math.pow(80 - device.x, 2) + Math.pow(150 - device.y, 2));
            // Signal strength decreases with distance and interference
            const strength = Math.max(0, 100 - distance / 2);
            
            return {
              ...device,
              signalStrength: strength,
              connected: strength > 30, // Simple threshold for connection
              lastSeen: device.connected ? now : device.lastSeen
            };
          })
        );
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
    } else if (isPlaying && selectedSim === 'atom') {
      interval = setInterval(() => {
        setElectronAngles(prev => 
          prev.map((orbit, i) => 
            orbit.map(angle => (angle + 1) % 360)
          )
        );
      }, 50);
    }

    return () => clearInterval(interval);
  }, [isPlaying, selectedSim, angle, velocity, switchOn]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setWifiWaves([]);
    setProjectilePosition({ x: 0, y: 0 });
    setTrajectory([]);
    setCurrentFlow(0);
    setOrbits(1);
    setElectrons([2]);
    setElectronAngles([[0, 0]]);
  };

  const renderWiFiSimulation = () => {
    const routerX = 80;
    const routerY = 150;
    
    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl overflow-hidden border-2 border-blue-200">
        {/* Router */}
        <div 
          className={`absolute w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transition-all ${selectedDevice === 0 ? 'ring-4 ring-blue-400 scale-110' : ''}`}
          style={{ left: `${routerX}px`, top: `${routerY}px`, transform: 'translate(-50%, -50%)' }}
          onClick={() => setSelectedDevice(0)}
        >
          <Wifi className="w-6 h-6 text-white" />
          <div className="absolute -bottom-6 text-xs font-medium text-center w-20">Router</div>
        </div>
        
        {/* Connected Devices */}
        {devices.map((device, index) => {
          const isSelected = selectedDevice === device.id;
          const deviceIndex = index + 1;
          
          return (
            <div 
              key={device.id}
              className={`absolute w-8 h-8 ${device.connected ? 'bg-green-500' : 'bg-gray-400'} rounded-full flex items-center justify-center cursor-pointer transition-all ${isSelected ? 'ring-4 ring-blue-400 scale-125' : ''}`}
              style={{ 
                left: `${device.x}px`, 
                top: `${device.y}px`,
                transform: `translate(-50%, -50%) ${isSelected ? 'scale(1.25)' : ''}`
              }}
              onClick={() => setSelectedDevice(device.id)}
            >
              <div className="text-white text-xs font-bold">{deviceIndex}</div>
              <div className="absolute -bottom-6 text-xs font-medium text-center w-20">
                Device {deviceIndex}
                <div className="text-xs text-gray-600">{device.signalStrength.toFixed(0)}%</div>
              </div>
              
              {/* Signal strength indicator */}
              {device.connected && (
                <div 
                  className="absolute rounded-full bg-blue-200 opacity-20"
                  style={{
                    width: `${device.signalStrength * 2}px`,
                    height: `${device.signalStrength * 2}px`,
                    marginLeft: `-${device.signalStrength}px`,
                    marginTop: `-${device.signalStrength}px`,
                  }}
                />
              )}
            </div>
          );
        })}
        
        {/* WiFi Waves */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {wifiWaves.map((wave, index) => {
            const isData = wave.type === 'data';
            const isAck = wave.type === 'ack';
            
            return (
              <circle
                key={`${wave.id}-${index}`}
                cx={wave.x}
                cy={wave.y}
                r={wave.radius}
                fill="none"
                stroke={isData ? '#3B82F6' : isAck ? '#10B981' : '#8B5CF6'}
                strokeWidth={isData ? 2 : isAck ? 1.5 : 1}
                strokeDasharray={isData ? 'none' : '4,4'}
                opacity={wave.opacity}
              />
            );
          })}
          
          {/* Connection lines */}
          {devices.filter(d => d.connected).map(device => (
            <line
              key={`line-${device.id}`}
              x1={routerX}
              y1={routerY}
              x2={device.x}
              y2={device.y}
              stroke="#93C5FD"
              strokeWidth="1"
              strokeDasharray="5,5"
              opacity={0.5}
            />
          ))}
        </svg>
        
        {/* Network Traffic Panel */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-3 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Network Traffic</h3>
            <div className="text-xs text-gray-600">
              {devices.filter(d => d.connected).length} devices connected
            </div>
          </div>
          
          <div className="space-y-2 max-h-24 overflow-y-auto pr-2">
            {networkTraffic.length > 0 ? (
              networkTraffic.map((traffic, i) => (
                <div key={i} className="text-xs bg-blue-50 p-2 rounded">
                  <div className="flex justify-between">
                    <span>Device {traffic.from} → Device {traffic.to}</span>
                    <span>{Math.round(traffic.size * traffic.progress)}/{traffic.size} KB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full" 
                      style={{ width: `${Math.min(100, traffic.progress * 100)}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 text-sm py-2">
                {isPlaying ? 'Monitoring network traffic...' : 'Click Play to start simulation'}
              </div>
            )}
          </div>
        </div>
        
        {/* Controls */}
        <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-lg shadow-md w-48">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1">{t.frequency}: {wifiFrequency[0]} {t.hertz}</label>
              <Slider
                value={wifiFrequency}
                onValueChange={setWifiFrequency}
                min={2.4}
                max={5.0}
                step={0.1}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1">Signal Strength: {wifiStrength[0]}%</label>
              <Slider
                value={wifiStrength}
                onValueChange={setWifiStrength}
                min={10}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1">Channel: {wifiChannels[0]}</label>
              <Slider
                value={wifiChannels}
                onValueChange={setWifiChannels}
                min={1}
                max={11}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Selected Device Info */}
        {selectedDevice !== null && (
          <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-lg shadow-md w-48">
            <h3 className="font-medium mb-2">
              {selectedDevice === 0 ? 'Router' : `Device ${selectedDevice}`}
            </h3>
            
            {selectedDevice === 0 ? (
              <div className="space-y-1 text-sm">
                <div>Status: <span className="text-green-600">Online</span></div>
                <div>Frequency: {wifiFrequency[0]} GHz</div>
                <div>Channel: {wifiChannels[0]}</div>
                <div>Devices: {devices.filter(d => d.connected).length} connected</div>
              </div>
            ) : (
              <div className="space-y-1 text-sm">
                <div>Status: 
                  <span className={devices[selectedDevice - 1]?.connected ? 'text-green-600' : 'text-red-600'}>
                    {devices[selectedDevice - 1]?.connected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <div>Signal: {devices[selectedDevice - 1]?.signalStrength.toFixed(0)}%</div>
                <div>IP: 192.168.1.{selectedDevice}</div>
                <div>MAC: 00:1A:2B:3C:{selectedDevice}1:2{selectedDevice}</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

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

  const renderAtomSimulation = () => {
    const centerX = 150;
    const centerY = 120;
    const maxOrbits = 4;
    const orbitRadius = 30;
    
    const addOrbit = () => {
      if (orbits < maxOrbits) {
        setOrbits(prev => prev + 1);
        setElectrons(prev => [...prev, 0]);
        setElectronAngles(prev => [...prev, []]);
      }
    };

    const removeOrbit = () => {
      if (orbits > 1) {
        setOrbits(prev => prev - 1);
        setElectrons(prev => prev.slice(0, -1));
        setElectronAngles(prev => prev.slice(0, -1));
      }
    };

    const addElectron = (orbitIndex: number) => {
      if (electrons[orbitIndex] < (orbitIndex + 1) * 2) {
        const newElectrons = [...electrons];
        newElectrons[orbitIndex] += 1;
        setElectrons(newElectrons);
        
        const newAngles = [...electronAngles];
        newAngles[orbitIndex] = [...newAngles[orbitIndex], 0];
        setElectronAngles(newAngles);
      }
    };

    const removeElectron = (orbitIndex: number) => {
      if (electrons[orbitIndex] > 0) {
        const newElectrons = [...electrons];
        newElectrons[orbitIndex] -= 1;
        setElectrons(newElectrons);
        
        const newAngles = [...electronAngles];
        newAngles[orbitIndex] = newAngles[orbitIndex].slice(0, -1);
        setElectronAngles(newAngles);
      }
    };

    return (
      <div className="relative w-full h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden border-2 border-purple-200">
        <svg className="w-full h-full">
          {/* Nucleus */}
          <circle 
            cx={centerX} 
            cy={centerY} 
            r={15} 
            fill="#4F46E5" 
            className="animate-pulse"
          />
          
          {/* Orbit Paths */}
          {Array.from({ length: orbits }).map((_, i) => {
            const radius = orbitRadius * (i + 1);
            return (
              <circle
                key={`orbit-${i}`}
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke="#A78BFA"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            );
          })}
          
          {/* Electrons */}
          {electronAngles.map((orbit, orbitIndex) => {
            const radius = orbitRadius * (orbitIndex + 1);
            return orbit.map((angle, electronIndex) => {
              const radian = (angle * Math.PI) / 180;
              const x = centerX + radius * Math.cos(radian);
              const y = centerY + radius * Math.sin(radian);
              
              return (
                <circle
                  key={`electron-${orbitIndex}-${electronIndex}`}
                  cx={x}
                  cy={y}
                  r={5}
                  fill="#F59E0B"
                  className="drop-shadow-sm"
                />
              );
            });
          })}
        </svg>
        
        {/* Controls */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-3 rounded-lg flex justify-between items-center">
          <div className="flex-1 mr-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{t.orbits}: {orbits}</span>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={removeOrbit}
                  disabled={orbits <= 1}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addOrbit}
                  disabled={orbits >= maxOrbits}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {Array.from({ length: orbits }).map((_, i) => (
              <div key={`electron-control-${i}`} className="flex justify-between items-center mb-1">
                <span className="text-xs">{t.electrons} {i + 1}: {electrons[i] || 0}</span>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="xs" 
                    onClick={() => removeElectron(i)}
                    disabled={!electrons[i]}
                    className="h-6 w-6 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="xs" 
                    onClick={() => addElectron(i)}
                    disabled={electrons[i] >= (i + 1) * 2}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

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
              {selectedSim === 'atom' && renderAtomSimulation()}
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