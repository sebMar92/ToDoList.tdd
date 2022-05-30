import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../src/components/options/options.jsx';
import List from '../src/components/list/list.jsx';
import CreateForm from '../src/components/createForm/createForm.jsx';

describe('<Options /> component', () => {
  it('should have three buttons -create item-, -hide/show completed- (alternates on click), -change style-', () => {
    render(<Options />);

    expect(screen.getByText(/create item/i)).toBeInTheDocument();
    expect(screen.getByText(/change style/i)).toBeInTheDocument();

    const hideShow = screen.getByText(/hide completed/i);
    expect(hideShow).toBeInTheDocument();

    userEvent.click(hideShow);
    expect(screen.getByText(/show completed/i)).toBeInTheDocument();
  });
});

describe('<CreateForm /> component', () => {
  it('should have an input, a cancel button and a confirm button', () => {
    render(<CreateForm />);

    expect(screen.getByText(/type a description/i)).toBeInTheDocument();
    expect(screen.getByText(/X/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirm/i)).toBeInTheDocument();
  });
});

describe('<List /> component', () => {
  it("should have a sign with the words 'there's no to-do item yet' when the list is empty", () => {
    render(<List />);

    expect(screen.getByText(/there's no to-do item yet/i)).toBeInTheDocument();
  });
  it('should list every new item created', () => {
    render(<List />);
    expect(screen.getByText(/there's no to-do item yet/i)).toBeInTheDocument();
    render(<CreateForm />);
    const input = screen.getByLabelText(/description/i);
    const confirm = screen.getByText(/confirm/i);
    userEvent.click(input);
    userEvent.type('test item creation');
    userEvent.click(confirm);
    expect(screen.getByText(/test item creation/i)).toBeInTheDocument();
  });
});
