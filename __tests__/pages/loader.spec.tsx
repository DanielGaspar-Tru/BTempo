import React from 'react';
import {Loader} from '../../src/pages';
import {renderWithWrapper} from '../../src/utils/tests';

describe('Pages -> Loader', () => {
  it('Should render correctly', async () => {
    renderWithWrapper(<Loader />);
  });
});
