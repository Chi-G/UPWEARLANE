# UPWEARLANE

A Laravel shop application with Inertia.js and React.

## Getting Started

### Prerequisites

- PHP
- Composer
- Node.js & npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   composer install
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your database.
4. Generate application key:
   ```bash
   php artisan key:generate
   ```
5. Run migrations:
   ```bash
   php artisan migrate
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- **Backend**: Laravel
- **Frontend**: Inertia.js, React, Tailwind CSS
- **Build Tool**: Vite
