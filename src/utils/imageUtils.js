export const generateOptimizedImageUrl = (imageUrl) => {
  const url = typeof imageUrl === 'string' ? imageUrl : imageUrl?.url;
  if (!url) return '';
  return url.replace('/upload/', '/upload/q_auto,f_auto,w_800,h_600,c_limit/');
};
