type Props = {
  playing: boolean;
  size: number;
};

export const PlayPauseIcon = ({ playing, size }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    {playing ? (
      <>
        <rect x="6" y="5" width="4" height="14" rx="0.5" />
        <rect x="14" y="5" width="4" height="14" rx="0.5" />
      </>
    ) : (
      <path d="M8 5v14l11-7z" />
    )}
  </svg>
);
