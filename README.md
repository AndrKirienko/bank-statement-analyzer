# Bank Statement Analyzer

The project is a tool for analyzing bank statements.

## How to get started

**1. Install the dependencies:**

```bash
npm install
```

**2. Start the development server:**

```bash
npm run dev
```

**3. Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Main Dashboard with parsed transaction data

![Dashboard](./public/screenshots/dashboard.png)

## Challenges & Insights

Implementing this project provided several technical challenges that required deep dives into documentation and environment configuration:

- **Shadcn/UI Adoption:** It was my first experience using the Shadcn/UI approach. Understanding the "copy-paste" component philosophy versus traditional NPM libraries took time, especially regarding the initial configuration and component customization to fit the project's needs.
- **Theme Management:** Implementing a robust Dark Mode was more complex than expected. Ensuring seamless theme synchronization without hydration flickering required a solid understanding of next-themes and Tailwind CSS configuration.
- **Testing Environment Setup:** Configuring Vitest for a Next.js environment presented several "non-obvious" errors. Separating business logic from browser-dependent APIs was a key solution that allowed the tests to run efficiently in a Node.js environment.
- **Data Validation & Normalization:** Handling external CSV data required careful validation. Using Zod to transform raw string inputs into typed numerical data was crucial for preventing calculation errors and ensuring overall application stability.
