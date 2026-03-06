import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { activities } from '@/data/mockData';
import { MapPin, Filter, Users, Clock, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  activities: typeof activities;
  totalBeneficiaries: number;
  totalVolunteers: number;
  totalHours: number;
}

const activityLocations: LocationData[] = [
  {
    id: 'l1', name: 'College Campus', lat: 17.69, lng: 74.00,
    activities: activities.filter(a => a.venue.includes('College') || a.venue.includes('Campus')),
    totalBeneficiaries: 320, totalVolunteers: 205, totalHours: 740,
  },
  {
    id: 'l2', name: 'Sundarnagar Village', lat: 17.72, lng: 74.05,
    activities: activities.filter(a => a.venue.includes('Sundarnagar')),
    totalBeneficiaries: 200, totalVolunteers: 45, totalHours: 180,
  },
  {
    id: 'l3', name: 'Shivaji Nagar', lat: 17.68, lng: 73.98,
    activities: activities.filter(a => a.venue.includes('Shivaji')),
    totalBeneficiaries: 450, totalVolunteers: 60, totalHours: 240,
  },
  {
    id: 'l4', name: 'City Centre', lat: 17.70, lng: 73.96,
    activities: activities.filter(a => a.venue.includes('City')),
    totalBeneficiaries: 1500, totalVolunteers: 200, totalHours: 400,
  },
  {
    id: 'l5', name: 'Karad (Panchayat Office)', lat: 17.29, lng: 74.18,
    activities: activities.filter(a => a.venue.includes('Karad')),
    totalBeneficiaries: 75, totalVolunteers: 25, totalHours: 50,
  },
  {
    id: 'l6', name: 'Wai (ZP High School)', lat: 17.95, lng: 73.89,
    activities: activities.filter(a => a.venue.includes('Wai')),
    totalBeneficiaries: 60, totalVolunteers: 30, totalHours: 120,
  },
  {
    id: 'l7', name: 'Kolhapur & Sangli Districts', lat: 16.70, lng: 74.24,
    activities: activities.filter(a => a.venue.includes('Kolhapur')),
    totalBeneficiaries: 2000, totalVolunteers: 150, totalHours: 900,
  },
];

const maxBeneficiaries = Math.max(...activityLocations.map(l => l.totalBeneficiaries));

const HeatMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...new Set(activities.map(a => a.category))];

  const totalBeneficiaries = activityLocations.reduce((s, l) => s + l.totalBeneficiaries, 0);
  const totalVolunteers = activityLocations.reduce((s, l) => s + l.totalVolunteers, 0);
  const totalHours = activityLocations.reduce((s, l) => s + l.totalHours, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Geographic Impact Map</h1>
        <p className="text-muted-foreground text-sm">Activity coverage and regional impact visualization</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Locations Covered', value: activityLocations.length, icon: MapPin },
          { label: 'Total Beneficiaries', value: totalBeneficiaries.toLocaleString(), icon: Users },
          { label: 'Total Volunteers', value: totalVolunteers, icon: Users },
          { label: 'Total Hours', value: totalHours.toLocaleString(), icon: Clock },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <kpi.icon size={14} />
              <span className="text-xs">{kpi.label}</span>
            </div>
            <p className="font-display text-xl font-bold">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={14} className="text-muted-foreground" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filterCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {cat === 'all' ? 'All Categories' : cat}
          </button>
        ))}
      </div>

      {/* Map visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual map area */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden relative"
          style={{ minHeight: 420 }}
        >
          {/* Stylized map background */}
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(circle at 30% 40%, hsl(var(--primary) / 0.06) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, hsl(var(--info) / 0.04) 0%, transparent 40%),
              radial-gradient(circle at 50% 80%, hsl(var(--success) / 0.05) 0%, transparent 45%),
              hsl(var(--muted) / 0.3)
            `
          }} />

          {/* Grid lines for map feel */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Title overlay */}
          <div className="absolute top-4 left-4 z-10">
            <p className="text-xs font-medium text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border">
              Maharashtra Region — Activity Distribution
            </p>
          </div>

          {/* Location bubbles */}
          <div className="relative w-full h-full" style={{ minHeight: 420 }}>
            {activityLocations.map((loc, i) => {
              const intensity = loc.totalBeneficiaries / maxBeneficiaries;
              const size = 28 + intensity * 52;
              // Position bubbles in a spread layout
              const positions = [
                { top: '30%', left: '40%' },
                { top: '22%', left: '58%' },
                { top: '45%', left: '35%' },
                { top: '38%', left: '52%' },
                { top: '65%', left: '62%' },
                { top: '18%', left: '25%' },
                { top: '72%', left: '38%' },
              ];
              const pos = positions[i] || { top: '50%', left: '50%' };

              return (
                <motion.button
                  key={loc.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setSelectedLocation(loc)}
                  className="absolute z-10 group"
                  style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                >
                  {/* Pulse ring */}
                  <motion.div
                    animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                    className="absolute inset-0 rounded-full bg-primary/30"
                    style={{ width: size, height: size }}
                  />
                  {/* Bubble */}
                  <div
                    className="rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-lg cursor-pointer relative"
                    style={{
                      width: size, height: size,
                      background: `radial-gradient(circle, hsl(var(--primary) / ${0.6 + intensity * 0.4}), hsl(var(--primary) / ${0.3 + intensity * 0.3}))`,
                      fontSize: size < 40 ? 9 : 11,
                    }}
                  >
                    {loc.totalBeneficiaries > 999 ? `${(loc.totalBeneficiaries / 1000).toFixed(1)}k` : loc.totalBeneficiaries}
                  </div>
                  {/* Label */}
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] bg-card/90 backdrop-blur-sm px-2 py-0.5 rounded-md border border-border text-foreground font-medium shadow-sm">
                      {loc.name}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 z-10 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
            <p className="text-[10px] font-medium text-muted-foreground mb-2">Beneficiary Impact</p>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary/30" />
              <span className="text-[10px] text-muted-foreground">Low</span>
              <div className="w-6 h-6 rounded-full bg-primary/60" />
              <span className="text-[10px] text-muted-foreground">Medium</span>
              <div className="w-8 h-8 rounded-full bg-primary/90" />
              <span className="text-[10px] text-muted-foreground">High</span>
            </div>
          </div>
        </motion.div>

        {/* Location details sidebar */}
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wide">Activity Locations</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {activityLocations.map((loc, i) => {
              const intensity = loc.totalBeneficiaries / maxBeneficiaries;
              const isSelected = selectedLocation?.id === loc.id;
              return (
                <motion.button
                  key={loc.id}
                  initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedLocation(isSelected ? null : loc)}
                  className={`w-full text-left bg-card border rounded-xl p-3 transition-all ${
                    isSelected ? 'border-primary shadow-sm ring-1 ring-primary/20' : 'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: `hsl(var(--primary) / ${0.4 + intensity * 0.6})` }} />
                    <span className="font-semibold text-sm">{loc.name}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Beneficiaries</p>
                      <p className="font-bold text-primary">{loc.totalBeneficiaries.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Volunteers</p>
                      <p className="font-bold">{loc.totalVolunteers}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Hours</p>
                      <p className="font-bold">{loc.totalHours}</p>
                    </div>
                  </div>
                  {isSelected && loc.activities.length > 0 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-2 pt-2 border-t border-border">
                      {loc.activities.map(a => (
                        <p key={a.id} className="text-xs text-muted-foreground py-0.5">• {a.title}</p>
                      ))}
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
