import React from "react";
import ReactDOM from "react-dom";
import Selector from "./../Selector";

import renderer from "react-test-renderer";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

it('Renders without crashing', () =>  {
   const div = document.createElement('div');
   ReactDOM.render(<Selector />, div);
   ReactDOM.unmountComponentAtNode(div);
});
