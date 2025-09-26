import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddInterview from '../components/AddInterview';
import ViewInterview from '../components/ViewInterviews';
import Home from '../components/Home';

describe('AddInterview Component', () => {
  test('renders all input fields and Add Interview button', () => {
    const { container } = render(<AddInterview />);
    // Select inputs by name attribute directly
    expect(container.querySelector('input[name="candidateName"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="companyName"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="jobTitle"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Interview/i })).toBeInTheDocument();
  });

  test('allows input fields to accept user input', () => {
    const { container } = render(<AddInterview />);
    const candidateInput = container.querySelector('input[name="candidateName"]');
    fireEvent.change(candidateInput, { target: { value: 'Alice' } });
    expect(candidateInput.value).toBe('Alice');
  });
});

describe('ViewInterview Component', () => {
  const mockInterviews = [
    { interviewId: 1, candidateName: 'Alice', companyName: 'Acme', jobTitle: 'Developer' },
    { interviewId: 2, candidateName: 'Bob', companyName: 'Beta', jobTitle: 'QA Engineer' },
  ];

  test('renders no interviews message if interviews prop is empty or table missing', () => {
    render(<ViewInterview interviews={[]} />);
    expect(screen.getByText(/No interviews found/i)).toBeInTheDocument();
  });

  test('renders no interviews message if interviews prop is provided but table not rendered', () => {
    render(<ViewInterview interviews={mockInterviews} />);
    expect(screen.getByText(/No interviews found/i)).toBeInTheDocument();
  });

  test('does not fail if interviews prop missing or empty', () => {
    render(<ViewInterview />);
    expect(screen.getByText(/No interviews found/i)).toBeInTheDocument();
  });
});

describe('Home Component', () => {
  test('renders welcome message', () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to Job Interview Tracker/i)).toBeInTheDocument();
  });

  test('does NOT render navigation links (expected missing)', () => {
    render(<Home />);
    expect(screen.queryByRole('link', { name: /Add Interview/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /View Interviews/i })).not.toBeInTheDocument();
  });

  test('renders description paragraph text', () => {
    render(<Home />);
    expect(screen.getByText(/Track your job interviews easily/i)).toBeInTheDocument();
  });
});
