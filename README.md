This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Data Schemas

The following schemas describe the data structure for Products, Parts, and SMT Line Packages. Use these references when building the Admin Portal / Backend.

### Product (Machines)
Represents SMT Machines (Pick & Place, Reflow Ovens, etc.).

```json
{
  "id": "string (unique-slug)",
  "name": "string",
  "brand": "string",
  "category": "string (e.g., 'SMT Machines')",
  "subcategory": "string (e.g., 'Pick & Place Machines', 'Reflow Ovens')",
  "condition": "'New' | 'Used' | 'Refurbished'",
  "yearOfManufacture": "number (optional)",
  "price": "string",
  "image": "string (url)",
  "images": "string[] (optional)",
  "shortDescription": "string",
  "longDescription": "string",
  "specifications": [
    { "label": "string", "value": "string" }
  ],
  "features": "string[]",
  "availability": "string"
}
```

### Part (SMT Parts)
Represents Spare Parts and Consumables.

```json
{
  "id": "string (unique-slug)",
  "name": "string",
  "brand": "string",
  "category": "string (e.g., 'SMT Parts')",
  "subcategory": "string (e.g., 'Feeders & Feeder Parts', 'Nozzles')",
  "partNumber": "string",
  "condition": "'New' | 'Used' | 'Refurbished'",
  "price": "string",
  "image": "string (url)",
  "compatibleModels": "string[]",
  "description": "string",
  "specifications": [
    { "label": "string", "value": "string" }
  ],
  "availability": "string"
}
```

### SMT Line Package
Represents a complete SMT production line configuration.

```json
{
  "id": "string (unique-slug)",
  "name": "string",
  "price": "string",
  "image": "string (url)",
  "machines": "string[] (list of machine names included)",
  "suitableFor": "string",
  "capacity": "string",
  "floorSpace": "string",
  "description": "string",
  "features": "string[]"
}
```
