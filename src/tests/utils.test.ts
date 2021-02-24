import Enzyme from 'enzyme';
import ReactSixteenAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import mockPlaces from './mockData/places.json';
import { normalizeData } from '../utils';
import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new ReactSixteenAdapter() });
describe('utils tests', () => {
  test('normalizeData', () => {
    const res = normalizeData(mockPlaces.data);
    expect(res).toBe(1);
  });
});
