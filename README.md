# TransferPoints

TransferPoints is a modern, consumer-facing web application that tracks credit card points transfer bonuses, transfer partner relationships, program details, and historical bonus data.

## Features

- **Live Bonus Tracking**: Real-time monitoring of transfer bonuses from Amex, Chase, Citi, Capital One, Bilt, Wells Fargo, Brex, and Marriott.
- **Detailed History**: Searchable archive of past transfer bonuses.
- **Transfer Matrix**: Interactive matrix of transfer partners and ratios.
- **Programs & Partners**: Detailed directories for every credit card program and airline/hotel partner.
- **Responsive Design**: Mobile-first, light-themed UI modeled after premium travel tools.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages (Static Export)
- **Data**: Static JSON files in `/data` (no database required)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/latelogic-lalo/transferpoints.git
   cd transferpoints
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Data Management

All data is stored in the `/data` directory:
- `programs.json`: Credit card programs
- `partners.json`: Airline and hotel partners
- `bonuses.json`: Transfer bonus records
- `transfer_relationships.json`: Transfer ratios and fees

## Deployment

This project is configured to deploy automatically to GitHub Pages on every push to `main`.
To manually build:
```bash
npm run build
# The static output will be in the `out/` directory.
```
