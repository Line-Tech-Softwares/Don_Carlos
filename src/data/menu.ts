export type MenuCategory = 'Burgers' | 'Chicken' | 'Combos' | 'Sides' | 'Drinks'

export type MenuItem = {
  name: string
  description: string
  category: MenuCategory
  demoPrice: number
  image: string
  featured?: boolean
}

export const categories: Array<MenuCategory | 'All'> = ['All', 'Burgers', 'Chicken', 'Combos', 'Sides', 'Drinks']

export const menuItems: MenuItem[] = [
  { name: 'The Carlos', description: 'Grilled beef, cheddar, crisp lettuce, tomato and house sauce.', category: 'Burgers', demoPrice: 89, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=82', featured: true },
  { name: 'Double Trouble', description: 'Two beef patties, melted cheese, pickles and tangy sauce.', category: 'Burgers', demoPrice: 115, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=82' },
  { name: 'Crispy Chicken', description: 'Golden chicken, slaw and a little house-made heat.', category: 'Chicken', demoPrice: 79, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=82' },
  { name: 'Half Chicken & Chips', description: 'A generous half chicken with golden fries. Demo menu item.', category: 'Chicken', demoPrice: 129, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=82', featured: true },
  { name: 'The Big Table', description: 'A burger, fries and a cool drink in one easy combo.', category: 'Combos', demoPrice: 139, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=82' },
  { name: 'Chicken & Chips Combo', description: 'Crispy chicken served with fries and a drink.', category: 'Combos', demoPrice: 119, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=82' },
  { name: 'Golden Chips', description: 'Hot, crisp fries with a pinch of seasoning.', category: 'Sides', demoPrice: 35, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=82' },
  { name: 'Spiced Wings', description: 'A shareable portion tossed in a smoky demo seasoning.', category: 'Sides', demoPrice: 59, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=82' },
  { name: 'Cold Drink', description: 'A chilled soft drink. Flavours to be confirmed.', category: 'Drinks', demoPrice: 22, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=82' },
]
