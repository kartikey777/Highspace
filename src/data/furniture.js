// Furniture data for Highspace Furniture.
// Each category has its own page. Each item can have multiple photos (slider).
//
// USING YOUR OWN IMAGES:
// 1. Add images to public/images/<category-id>/<item-slug>/ e.g. public/images/living-room/velvet-sofa/1.jpg
// 2. In the item's images array use paths like: '/images/living-room/velvet-sofa/1.jpg'
// You can mix URLs (external) and /images/... (your files in public folder).

export const furnitureByCategory = [
  {
    id: 'living-room',
    title: 'Living Room',
    description: 'Sofas, coffee tables & accent pieces for your living space.',
    items: [
      {
        id: 'lr-1',
        name: 'Modern Velvet Sofa',
        description: 'Deep-seat three-seater in emerald velvet. Solid wood frame.',
        images: [
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
          'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800',
        ],
      },
      {
        id: 'lr-2',
        name: 'Marble Coffee Table',
        description: 'Round marble top on brass legs. Statement centerpiece.',
        images: [
          'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
          'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800',
        ],
      },
      {
        id: 'lr-3',
        name: 'Leather Accent Chair',
        description: 'Hand-stitched leather armchair. Timeless design.',
        images: [
          'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800',
          'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800',
          'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800',
        ],
      },
    ],
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    description: 'Beds, nightstands & dressers for restful nights.',
    items: [
      {
        id: 'br-1',
        name: 'Upholstered Platform Bed',
        description: 'Low-profile bed with fabric headboard. Available in several fabrics.',
        images: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
          'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800',
        ],
      },
      {
        id: 'br-2',
        name: 'Oak Nightstand Set',
        description: 'Pair of solid oak nightstands with soft-close drawers.',
        images: [
          'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
          'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800',
        ],
      },
      {
        id: 'br-3',
        name: 'Minimalist Dresser',
        description: 'Wide six-drawer dresser. Clean lines, ample storage.',
        images: [
          'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
          'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
        ],
      },
    ],
  },
  {
    id: 'office',
    title: 'Office & Desk',
    description: 'Desks, bookshelves & ergonomic seating for work from home.',
    items: [
      {
        id: 'of-1',
        name: 'Executive Desk',
        description: 'Spacious L-shaped desk with cable management.',
        images: [
          'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800',
          'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800',
          'https://images.unsplash.com/photo-1595515389372-a3b2a1c0d50a?w=800',
        ],
      },
      {
        id: 'of-2',
        name: 'Ergonomic Office Chair',
        description: 'Adjustable lumbar support, breathable mesh back.',
        images: [
          'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800',
          'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800',
        ],
      },
      {
        id: 'of-3',
        name: 'Wall-Mounted Shelving',
        description: 'Modular floating shelves. Mix and match lengths.',
        images: [
          'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
          'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800',
        ],
      },
    ],
  },
  {
    id: 'dining',
    title: 'Dining',
    description: 'Tables, chairs & sideboards for meals and gatherings.',
    items: [
      {
        id: 'dn-1',
        name: 'Extendable Dining Table',
        description: 'Seats 6–10. Solid wood with extension leaves.',
        images: [
          'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
          'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800',
        ],
      },
      {
        id: 'dn-2',
        name: 'Dining Chair Set',
        description: 'Set of 4 or 6. Bentwood frame, fabric or leather seat.',
        images: [
          'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800',
          'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800',
        ],
      },
      {
        id: 'dn-3',
        name: 'Buffet & Console',
        description: 'Storage and display for dinnerware and glassware.',
        images: [
          'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800',
          'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
        ],
      },
    ],
  },
];

/** Get a single category by id (e.g. 'living-room', 'bedroom'). */
export function getCategoryById(id) {
  return furnitureByCategory.find((cat) => cat.id === id) ?? null;
}
