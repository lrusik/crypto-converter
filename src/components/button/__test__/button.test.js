import React from "react";
import ReactDOM from "react-dom";
import Button from "./../Button";

import renderer from "react-test-renderer";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

it('Renders without crashing', () =>  {
   const div = document.createElement('div');
   ReactDOM.render(<Button />, div);
   ReactDOM.unmountComponentAtNode(div);
});

it('Renders button correctly', () => {
   const {getByTestId} = render(<Button label="click me" />);
   expect(getByTestId('button')).toHaveTextContent("click me");
});

it("matches snapshot", () => {
   const tree = renderer.create(<Button label="click me"></Button>).toJSON();
   expect(tree).toMatchSnapshot();
});
