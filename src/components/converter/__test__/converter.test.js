import React from "react";
import ReactDOM from "react-dom";
import Converter from "./../Converter";
import '@testing-library/jest-dom';

it('Renders without crashing', () =>  {
   const div = document.createElement('div');
   ReactDOM.render(<Converter />, div);
   ReactDOM.unmountComponentAtNode(div);
});
