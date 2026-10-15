export const concept = {
  displayName: 'DON CARLOS',
  conceptPreview: true,
  phoneDisplay: '+27 71 287 1723',
  phoneHref: 'tel:+27712871723',
  address: '23 Mphaki Street, Mamelodi SA5, Pretoria, 0122, South Africa',
  mapHref: 'https://www.google.com/maps/search/?api=1&query=23+Mphaki+Street%2C+Mamelodi+SA5%2C+Pretoria%2C+0122%2C+South+Africa',
  hours: 'Daily, 9:30 AM – 9:30 PM',
  facebook: 'https://www.facebook.com/DonCarlosMams/',
  instagram: 'https://www.instagram.com/explore/locations/397552800/don-carlos-kitchens---mamelodi/',
  heroImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=2100&q=88',
  aboutImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85',
  galleryImages: [
    { src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1100&q=85', alt: 'Demo photograph of a stacked cheeseburger' },
    { src: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=85', alt: 'Demo photograph of crispy fried chicken' },
    { src: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=85', alt: 'Demo photograph of golden fries' },
    { src: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1100&q=85', alt: 'Demo photograph of a chicken sandwich' },
  ],
  colors: {
    ink: '#171613',
    paper: '#f1eee6',
    accent: '#ee6b3a',
    muted: '#a8a49a',
  },
} as const

export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Our story', href: '#story' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit', href: '#visit' },
] as const
