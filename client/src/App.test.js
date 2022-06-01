import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../src/components/options/options.jsx';
import List from '../src/components/list/list.jsx';
import CreateForm from '../src/components/createForm/createForm.jsx';
import * as services from '../src/services/index.js';

describe('<Options /> component', () => {
  it('should have three buttons -create item-, -hide/show completed- (alternates on click), -delete all-', () => {
    render(<Options setHideCompleted={function () {}} />);

    expect(screen.getByText(/create item/i)).toBeInTheDocument();
    expect(screen.getByText(/delete all/i)).toBeInTheDocument();

    const hideShow = screen.getByText(/hide completed/i);
    expect(hideShow).toBeInTheDocument();

    userEvent.click(hideShow);
    expect(screen.getByText(/show completed/i)).toBeInTheDocument();
  });
  it('should show the CreateForm when createItem is clicked', async () => {
    render(<Options setHideCompleted={function () {}} />);

    const createItem = screen.getByText(/create item/i);
    userEvent.click(createItem);
    expect(await screen.findByText(/type a description/i)).toBeInTheDocument();
  });
  it('should call -deleteAll- when the user clicks on Delete all', () => {
    const mock = jest.spyOn(services, 'deleteAll');

    render(<Options setHideCompleted={function () {}} />);

    const deleteAllButton = screen.getByText(/delete all/i);

    userEvent.click(deleteAllButton);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});

describe('<CreateForm /> component', () => {
  it('should have an input, a cancel button and a confirm button', () => {
    render(<CreateForm />);

    expect(screen.getByText(/type a description/i)).toBeInTheDocument();
    expect(screen.getByText(/X/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirm/i)).toBeInTheDocument();
  });
  it('should call -createItem- when a user types a description and clicks on confirm', () => {
    const mock = jest.spyOn(services, 'createItem');
    render(
      <CreateForm
        setHideCompleted={function () {}}
        setListRender={function () {}}
        popCloser={function () {}}
      />
    );
    const input = screen.getByText(/type a description/i);
    const confirmButton = screen.getByText(/Confirm/i);

    userEvent.type(input, 'Test 0');
    userEvent.click(confirmButton);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('should not call -createItem- when a user clicks on confirm without typing a description', () => {
    const mock = jest.spyOn(services, 'createItem');

    render(
      <CreateForm
        setHideCompleted={function () {}}
        setListRender={function () {}}
        popCloser={function () {}}
      />
    );
    const input = screen.getByText(/type a description/i);
    const confirmButton = screen.getByText(/Confirm/i);
    userEvent.type(input, 'Test 0');
    userEvent.click(confirmButton);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});

describe('<List /> component', () => {
  it("should have a sign with the words 'there's no to-do item yet' when the list is empty", () => {
    const mock = jest.spyOn(services, 'getItems').mockResolvedValue([]);
    render(<List setListRender={function () {}} />);
    expect(screen.getByText(/there's no to-do item yet/i)).toBeInTheDocument();
  });
  it('should call -getItems- and display the items in inputs', async () => {
    const mock = jest.spyOn(services, 'getItems').mockResolvedValue([
      { id: 1, name: 'Test 1', completed: false },
      { id: 2, name: 'Test 2', completed: true },
    ]);
    render(<List setListRender={function () {}} />);
    expect(await screen.findByDisplayValue(/Test 1/i)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(/Test 2/i)).toBeInTheDocument();

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
