import React from 'react';
import App from '../../App';
import {shallow} from 'enzyme';

describe('App Test', () => {
  it('Should render correctly', async () => {
    shallow(<App />);
  });
});
