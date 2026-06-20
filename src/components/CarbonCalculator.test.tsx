import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CarbonCalculator from './CarbonCalculator';
import { AuthProvider } from '../context/AuthContext';

// Mock matchMedia for Recharts which uses it under the hood
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Framer Motion to skip animations in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: 'div',
      h2: 'h2'
    }
  };
});

describe('CarbonCalculator UI Component', () => {
  it('renders all calculator inputs', () => {
    render(
      <AuthProvider>
        <CarbonCalculator />
      </AuthProvider>
    );

    expect(screen.getByLabelText(/Electricity usage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Driving distance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Primary dietary habit/i)).toBeInTheDocument();
  });

  it('updates flights when buttons are clicked', () => {
    render(
      <AuthProvider>
        <CarbonCalculator />
      </AuthProvider>
    );

    const initialFlights = screen.getByText('1'); // Default is 1
    expect(initialFlights).toBeInTheDocument();

    const increaseBtn = screen.getByLabelText(/Increase flights/i);
    fireEvent.click(increaseBtn);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('updates the dietary select dropdown', () => {
    render(
      <AuthProvider>
        <CarbonCalculator />
      </AuthProvider>
    );

    const select = screen.getByLabelText(/Primary dietary habit/i);
    fireEvent.change(select, { target: { value: 'Vegan' } });
    
    expect((select as HTMLSelectElement).value).toBe('Vegan');
  });
});
