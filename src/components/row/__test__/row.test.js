import React from "react";
import ReactDOM from "react-dom";
import Row from "./../Row";

import renderer from "react-test-renderer";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

it('Renders without crashing', () =>  {
   const div = document.createElement('div');
   ReactDOM.render(<Row />, div);
   ReactDOM.unmountComponentAtNode(div);
});

it('Renders row correctly', () => {
   const {getByTestId} = render(<Row label="click me" />);
   expect(getByTestId('row')).toHaveTextContent("click me");
});

it("matches snapshot", () => {
   const tree = renderer.create(<Row label="click me" />).toJSON();
   expect(tree).toMatchSnapshot();
});
