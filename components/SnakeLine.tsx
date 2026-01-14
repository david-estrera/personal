"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function SnakeLine() {
  const { scrollYProgress } = useScroll();

  // Number of segments in the line - increased for smoother curves
  const numSegments = 120;
  
  // Generate continuous spring-like loops moving left to right (counter-clockwise) with slant
  const generateSpringPath = () => {
    const waypoints = [];
    const startX = 5;
    const endX = 95;
    const startY = 60; // Start lower
    const endY = 30; // End higher (slanted upward)
    const loopRadius = 20; // Bigger radius for larger loops
    const loops = 2; // Number of complete loops
    
    // Generate spring loops - many more points for ultra-smooth curves
    const loopProgress = 0.4; // Use 40% of progress for loops
    const numLoopPoints = loops * 32; // Many more points for smoother curves
    
    // Start immediately in a smooth curve - add more initial points for smoothness
    for (let i = 0; i <= numLoopPoints; i++) {
      const t = i / numLoopPoints;
      const progress = (t * loopProgress); // Start at 0, no offset
      
      // Slanted path: Y changes as we move right
      const baseY = startY + (endY - startY) * t;
      
      // Spring/helix pattern: counter-clockwise circular motion while moving right
      // Negative angle for counter-clockwise
      const angle = -t * Math.PI * 2 * loops;
      const x = startX + (endX - startX - 20) * t + Math.cos(angle) * loopRadius;
      const y = baseY + Math.sin(angle) * loopRadius;
      
      waypoints.push({ progress, x, y });
    }
    
    // Exit to the right - curved exit with slant
    waypoints.push({ progress: 0.42, x: endX - 10, y: endY + 5 });
    waypoints.push({ progress: 0.45, x: endX - 5, y: endY + 2 });
    waypoints.push({ progress: 0.48, x: endX, y: endY });
    waypoints.push({ progress: 0.5, x: endX, y: endY - 3 });
    
    return waypoints;
  };
  
  const waypoints = generateSpringPath();

  // Line opacity - disappears after 50%
  const lineOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 1],
    [1, 1, 0, 0]
  );

  // Function to get position along the path at a given progress
  const getPositionAtProgress = (progress: number) => {
    if (progress <= 0) {
      return { x: waypoints[0].x, y: waypoints[0].y };
    }
    if (progress >= waypoints[waypoints.length - 1].progress) {
      const last = waypoints[waypoints.length - 1];
      return { x: last.x, y: last.y };
    }
    
    // Find the segment
    for (let w = 0; w < waypoints.length - 1; w++) {
      if (progress >= waypoints[w].progress && progress <= waypoints[w + 1].progress) {
        const localProgress = (progress - waypoints[w].progress) / 
                             (waypoints[w + 1].progress - waypoints[w].progress);
        
        // Smooth interpolation
        const easedProgress = localProgress * localProgress * (3 - 2 * localProgress);
        
        const x = waypoints[w].x + (waypoints[w + 1].x - waypoints[w].x) * easedProgress;
        const y = waypoints[w].y + (waypoints[w + 1].y - waypoints[w].y) * easedProgress;
        
        return { x, y };
      }
    }
    
    return { x: waypoints[0].x, y: waypoints[0].y };
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#15803d" stopOpacity="0" />
            <stop offset="10%" stopColor="#15803d" stopOpacity="0.6" />
            <stop offset="30%" stopColor="#22c55e" stopOpacity="1" />
            <stop offset="50%" stopColor="#15803d" stopOpacity="1" />
            <stop offset="70%" stopColor="#22c55e" stopOpacity="1" />
            <stop offset="90%" stopColor="#15803d" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#15803d" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d={useTransform(scrollYProgress, (progress) => {
            // Only show line up to 50% scroll
            if (progress > 0.5) return "M 0 0";
            
            const points: Array<[number, number]> = [];
            const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
            const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
            
            // Rope-like trailing: each segment follows the exact same path, just delayed
            const ropeLength = 0.15; // Length of the rope (as fraction of progress)
            
            for (let i = 0; i < numSegments; i++) {
              // Each segment follows the head with a delay
              const segmentDelay = (i / numSegments) * ropeLength;
              const segmentProgress = Math.max(0, progress - segmentDelay);
              
              if (segmentProgress >= 0 && segmentProgress <= 0.5) {
                // Get position along the exact same path
                const pos = getPositionAtProgress(segmentProgress);
                
                // Convert percentage to pixels
                const xPx = (pos.x / 100) * viewportWidth;
                const yPx = (pos.y / 100) * viewportHeight;
                
                points.push([xPx, yPx]);
              }
            }
            
            if (points.length < 2) return "M 0 0";
            
            // Create ultra-smooth path using cubic Bezier curves
            let path = `M ${points[0][0]} ${points[0][1]}`;
            
            // Ensure all segments are curved smoothly
            for (let i = 1; i < points.length; i++) {
              if (i === 1 && points.length >= 3) {
                // First curve - use next point for better control
                const nextPoint = points[2];
                const cp1X = points[0][0] + (points[1][0] - points[0][0]) * 0.3;
                const cp1Y = points[0][1] + (points[1][1] - points[0][1]) * 0.3;
                const cp2X = points[1][0] - (nextPoint[0] - points[1][0]) * 0.2;
                const cp2Y = points[1][1] - (nextPoint[1] - points[1][1]) * 0.2;
                path += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${points[1][0]} ${points[1][1]}`;
              } else if (i < points.length - 1) {
                // Middle curves - smooth cubic Bezier
                const prevPoint = points[i - 1];
                const currPoint = points[i];
                const nextPoint = points[i + 1];
                
                // Control points for smooth curve - more gradual
                const cp1X = prevPoint[0] + (currPoint[0] - prevPoint[0]) * 0.5;
                const cp1Y = prevPoint[1] + (currPoint[1] - prevPoint[1]) * 0.5;
                const cp2X = currPoint[0] + (nextPoint[0] - currPoint[0]) * 0.3;
                const cp2Y = currPoint[1] + (nextPoint[1] - currPoint[1]) * 0.3;
                
                path += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${currPoint[0]} ${currPoint[1]}`;
              } else {
                // Last curve - smooth ending
                const prevPoint = points[i - 1];
                const currPoint = points[i];
                const cp1X = prevPoint[0] + (currPoint[0] - prevPoint[0]) * 0.5;
                const cp1Y = prevPoint[1] + (currPoint[1] - prevPoint[1]) * 0.5;
                const cp2X = currPoint[0];
                const cp2Y = currPoint[1];
                path += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${currPoint[0]} ${currPoint[1]}`;
              }
            }
            
            return path;
          })}
          stroke="url(#snakeGradient)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          style={{
            vectorEffect: "non-scaling-stroke",
            opacity: lineOpacity,
          }}
        />
      </svg>
    </div>
  );
}
