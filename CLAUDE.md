# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A web-based metronome application with guitar scale visualization, built with React, TypeScript, and Vite. Uses the Web Audio API for accurate beat timing and vanilla-extract for type-safe CSS styling.

## Development Commands

**Package Manager**: This project uses `pnpm@10.19.0`. Always use `pnpm` instead of `npm` or `yarn`.

### Claude Code Commands

- `/commit` - Analyzes git changes and creates logical, atomic commits with user approval

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Type checking (without emitting files)
pnpm type-check

# Linting
pnpm lint

# Preview production build
pnpm preview

# Deploy to GitHub Pages
pnpm deploy
```

## Architecture

### Feature-Based Structure

The app is organized around two main features accessible via tabs:
- **Metronome**: Primary feature with BPM control, beat visualization, volume control, and stopwatch
- **Guitar Scales**: Secondary feature with guitar fretboard visualization for practicing scales

Features are controlled via `featureContext.ts` which manages which feature is currently focused. The focused feature determines visibility and animations.

### Web Audio API Integration

Audio timing is critical for metronome accuracy. The implementation uses:

- **`oscillator.ts`**: Creates Web Audio API oscillators with gain nodes for volume control
  - Accented beats: 880 Hz
  - Regular beats: 440 Hz

- **`useMetronomeScheduler.ts`**: Core timing logic using `useSyncExternalStore` pattern
  - Uses a global reducer pattern with external state management (not React state)
  - Schedules beats ahead of time to avoid timing drift
  - Updates `nextNoteTime` based on audio context's current time, not setTimeout
  - Beat scheduling runs every 25ms but only triggers audio at precise intervals
  - When BPM changes during playback, adjusts `nextNoteTime` to maintain smooth tempo transition

### State Management

- **External Store Pattern**: The metronome uses `useSyncExternalStore` with a global state object (`metronomeState`) managed outside React's render cycle for precise timing
- **Context API**: Feature selection uses React Context (`featureContext.ts`) via `dogu-utils`'s `createSafeContext`

### Styling

Uses Vanilla Extract (`*.css.ts` files) for type-safe, CSS-in-JS styling with zero runtime overhead. Styles are co-located with components.

### Animations

Uses the `motion` library (Framer Motion) for smooth transitions between features and component animations.

## Project Configuration

- **Base URL**: `/web-metronome/` (configured for GitHub Pages deployment)
- **Path Alias**: `@/*` resolves to `src/*`
- **Plugins**: React SWC for fast compilation, Vanilla Extract for styling

## Key Implementation Details

### Metronome Timing Precision

The metronome achieves high timing accuracy by:
1. Using Web Audio API's `currentTime` instead of JavaScript timers for beat scheduling
2. Scheduling beats ahead of time in a loop that runs every 25ms
3. Only actually scheduling the next beat when `nextNoteTime <= audioContext.currentTime`
4. Breaking out of the loop after scheduling one beat to avoid scheduling too far ahead

### Feature Visibility

Components conditionally render based on `focusedFeature` from `useFeatureContext()`. The Metronome component shows a simplified view when not focused (only BPM and play button) and full controls when focused.
