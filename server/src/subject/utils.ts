export const compareByOrder = (trackId: string) => (a, b) => {
  const trackA = a.tracks.find((track) => track.trackId === trackId);
  const trackB = b.tracks.find((track) => track.trackId === trackId);

  return trackA.order - trackB.order;
};
