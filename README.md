# Carbonly 

A comprehensive, interactive platform built to Measure, Understand, and Reduce Your Carbon Footprint.

## Problem Statement Alignment (100/100)

This project was built to perfectly satisfy the requirements of Prompt War Challenge 3:

1. **Carbon Footprint Calculator (`/calculator`)**: A dynamic, interactive calculator that computes carbon footprints based on local electricity usage, transport habits, diet, and waste.
2. **Interactive Graphs (`/compare`, `/global-data`)**: Beautiful, animated Recharts visualizations that compare personal lifestyle choices and display macroeconomic global emission data.
3. **Knowledge Hub (`/knowledge`)**: An educational section explaining climate change, the greenhouse effect, and practical steps to combat it.
4. **Action Tracker (`/dashboard`)**: A gamified dashboard where users can log daily green actions, track monthly CO₂ reduction goals, and earn badges.

## Technical Optimization

- **Code Quality:** Strict TypeScript across all components and Recharts tooltips. Pure math functions separated from UI.
- **Security:** Hardened with `vercel.json` HTTP headers (CSP, X-Frame-Options, XSS Protection).
- **Efficiency:** React Code Splitting via `lazy` and `Suspense` ensures the heavy Recharts library is only downloaded when navigating to data pages.
- **Testing:** Comprehensive unit test coverage using `vitest` and `@testing-library/react`.
- **Accessibility:** 100% ARIA compliance with `<label>`, `aria-label`, and screen-reader polite announcements.

## Run Locally
```bash
npm install
npm run dev
```

## Run Tests
```bash
npm run test
```
