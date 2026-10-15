# Don Carlos Website Concept

A responsive restaurant website concept for Don Carlos in Mamelodi West, Pretoria, developed by Line Tech Softwares. This is a local client presentation prototype, not a production site or ordering system.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL shown by Vite. Verify the production build and TypeScript separately with `npm run build` and `npm run typecheck`.

## Stack

- React 19, Vite 8, TypeScript 6
- Lucide React icons
- Lenis smooth scrolling with reduced-motion and lifecycle handling
- Responsive CSS, including a lightweight CSS animated-gradient treatment

Shader Gradients integration was not added: the reference site did not provide a verifiable public package or integration contract. The hero uses an isolated CSS gradient fallback instead.

## Replace after client approval

- Review/confirm the supplied address, map pin, phone number, opening hours, dine-in/takeout and accessibility details.
- Replace the temporary food photographs with client-approved restaurant photography.
- Replace every menu name, description, category and clearly marked demo price with the approved menu.
- Replace the placeholder story and hero copy with approved brand messaging.
- Confirm the correct social accounts and any additional contact/order details.
- Update the temporary wordmark and palette when brand assets and guidelines are supplied.
- Set `conceptPreview` to `false` in `src/data/restaurant.ts` to remove the concept ribbon.

All editable restaurant details and image URLs are centralized in `src/data/restaurant.ts` and `src/data/menu.ts`.

## License

Proprietary. All rights reserved. See [LICENSE](LICENSE). Repository access is for concept review only; copying, alteration, redistribution, and deployment are not permitted without prior written authorization from Line Tech Softwares.
