// COLOR SYSTEM RULE: audio player ALWAYS uses --neon-amber regardless of audio type
// The type label pill (phone-call, interview, recording) uses --neon-amber
// All interactive elements (progress bar, play button, scrubber glow) use --neon-amber
// This connects audio to the "human communication" amber group, same as Letter/Transcript chips.
// The `type` prop drives label text only — not color.

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";

interface AudioPlayerProps {
  title: string;
  description?: string;
  duration?: string; // display only, e.g. "12:34"
  type?: "phone-call" | "interview" | "recording";
}

const TYPE_LABELS: Record<string, string> = {
  "phone-call": "Phone call",
  "interview":  "Interview",
  "recording":  "Recording",
};

/** Simulated audio player (no real src) with animated waveform, progress bar, play/pause/skip/mute controls, and an amber-coloured type pill; playback is timer-driven. */
export function AudioPlayer({ title, description, duration = "0:00", type = "recording" }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);  // 0–100
  const [muted, setMuted] = useState(false);
  const [elapsed, setElapsed] = useState("0:00");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate playback progress
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          const next = Math.min(p + 0.3, 100);
          if (next >= 100) { setPlaying(false); return 0; }
          // fake elapsed time
          const [m, s] = duration.split(":").map(Number);
          const total = (m || 0) * 60 + (s || 0);
          const secs = Math.round((next / 100) * total);
          setElapsed(`${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`);
          return next;
        });
      }, 300);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, duration]);

  const typeLabel = TYPE_LABELS[type] ?? "Recording";

  return (
    <div
      className="border"
      style={{
        // transparent bg — takes the colour of whatever container it's placed inside,
        // avoiding the white-card-on-cream contrast clash in light mode.
        background: "transparent",
        borderColor: "color-mix(in srgb, var(--neon-amber) 20%, transparent)",
        border: "1px solid color-mix(in srgb, var(--neon-amber) 18%, var(--hairline, var(--border)))",
        borderRadius: "4px",
        padding: "0.875rem 1rem",
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Waveform icon */}
        <div
          className="flex-shrink-0 flex items-end gap-px"
          style={{ height: "1.5rem", paddingTop: "0.25rem" }}
        >
          {[3, 6, 10, 7, 4, 8, 5, 9, 6, 3].map((h, i) => (
            <div
              key={i}
              style={{
                width: "2px",
                height: `${h}px`,
                background: "var(--neon-amber)",
                borderRadius: "1px",
                opacity: playing ? 1 : 0.5,
                animation: playing ? `waveform-${i % 3} ${0.6 + i * 0.07}s ease-in-out infinite alternate` : "none",
                transition: "opacity 0.2s",
              }}
            />
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              style={{
                fontSize: "0.625rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--neon-amber)",
                padding: "0.1rem 0.45rem",
                borderRadius: "9999px",
                border: "1px solid color-mix(in srgb, var(--neon-amber) 28%, transparent)",
                background: "color-mix(in srgb, var(--neon-amber) 10%, transparent)",
              }}
            >
              {typeLabel}
            </span>
            <span style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)" }}>{duration}</span>
          </div>
          <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", lineHeight: 1.3 }}>{title}</p>
          {description && <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.15rem" }}>{description}</p>}
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="relative mb-2 cursor-pointer"
        style={{ height: "3px", background: "var(--border)", borderRadius: "2px" }}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setProgress(((e.clientX - r.left) / r.width) * 100);
        }}
      >
        <div
          style={{
            position: "absolute", top: 0, left: 0, bottom: 0,
            width: `${progress}%`,
            background: "linear-gradient(90deg, var(--neon-amber), color-mix(in srgb, var(--neon-amber) 80%, transparent))",
            borderRadius: "2px",
            transition: "width 0.3s linear",
            boxShadow: "0 0 6px color-mix(in srgb, var(--neon-amber) 50%, transparent)",
          }}
        />
        {/* Scrubber dot */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${progress}%`,
            transform: "translate(-50%, -50%)",
            width: 10, height: 10,
            borderRadius: "50%",
            background: "var(--neon-amber)",
            boxShadow: "0 0 6px var(--neon-amber)",
            transition: "left 0.3s linear",
          }}
        />
      </div>

      {/* Time + Controls */}
      <div className="flex items-center justify-between">
        <span style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>
          {elapsed} / {duration}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setProgress(0)}
            className="w-7 h-7 flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ color: "var(--muted-foreground)" }}
          >
            <SkipBack size={12} />
          </button>

          <button
            onClick={() => setPlaying(!playing)}
            className="w-8 h-8 flex items-center justify-center transition-all hover:opacity-85"
            style={{
              background: "var(--accent-fill, var(--accent))",
              color: "var(--accent-on-fill, var(--card))",
              borderRadius: "50%",
              boxShadow: playing ? "0 0 12px -4px var(--accent)" : "none",
            }}
          >
            {playing ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
          </button>

          <button
            onClick={() => setProgress(100)}
            className="w-7 h-7 flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ color: "var(--muted-foreground)" }}
          >
            <SkipForward size={12} />
          </button>

          <button
            onClick={() => setMuted(!muted)}
            className="w-7 h-7 flex items-center justify-center transition-opacity hover:opacity-70 ml-1"
            style={{ color: "var(--muted-foreground)" }}
          >
            {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}
