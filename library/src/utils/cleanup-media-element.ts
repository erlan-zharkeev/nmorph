export const cleanupMediaElement = (mediaElement: HTMLMediaElement | null) => {
  if (!mediaElement) return;

  mediaElement.pause();

  if ('srcObject' in mediaElement && mediaElement.srcObject !== null) {
    mediaElement.srcObject = null;
  }

  mediaElement.removeAttribute('src');
  mediaElement.querySelectorAll('source').forEach((sourceElement) => sourceElement.removeAttribute('src'));
  mediaElement.load();
};
