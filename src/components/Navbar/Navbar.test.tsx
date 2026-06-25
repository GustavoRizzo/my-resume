import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { getI18n } from '../../i18n/config';
import Navbar from './Navbar';

function renderNavbar() {
  return render(
    <MemoryRouter>
      <I18nextProvider i18n={getI18n('en')}>
        <Navbar name="Gustavo Rizzo S. M. de Albuquerque" lang="en" />
      </I18nextProvider>
    </MemoryRouter>
  );
}

describe('Navbar Component', () => {
  it('renders title and toggle button, and toggles menu visibility', () => {
    renderNavbar();

    // Title should be present
    expect(screen.getByText('Gustavo Rizzo S. M. de Albuquerque')).toBeInTheDocument();

    // Menu options should be hidden by default (isHidden is true)
    expect(screen.queryByText('Expertise')).not.toBeInTheDocument();

    // Click toggle button (represented by the eye emoji button)
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    // Now links should be in the document
    expect(screen.getByText('Expertise')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Career')).toBeInTheDocument();
  });
});
