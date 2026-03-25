// Lightweight class merging utility (no external deps)
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// Prepends the GitHub Pages basePath in production so unoptimized images resolve correctly.
// Locally, returns the plain path unchanged so dev server works without any changes.
export const getImagePath = (path: string) => {
  return process.env.NODE_ENV === 'production' ? `/Portfolio${path}` : path;
};
