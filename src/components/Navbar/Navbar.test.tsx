import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  it('renders title and toggle button, and toggles menu visibility', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Title should be present
    expect(screen.getByText('Sketch Curriculum Components')).toBeInTheDocument();

    // Menu options should be hidden by default (isHidden is true)
    expect(screen.queryByText('List Expertise')).not.toBeInTheDocument();

    // Click toggle button (represented by the eye emoji button)
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    // Now links should be in the document
    expect(screen.getByText('List Expertise')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('CareerTimeline')).toBeInTheDocument();
  });
});
