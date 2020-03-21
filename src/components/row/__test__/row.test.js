import React from "react";
import ReactDOM from "react-dom";
import Row from "./../Row";

import '@testing-library/jest-dom'

it('Renders without crashing', () =>  {
   const div = document.createElement('div');
   ReactDOM.render(<Row />, div);
   ReactDOM.unmountComponentAtNode(div);
});