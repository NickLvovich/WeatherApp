import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { searchCity } from '@/services/cityService';

const USERNAME = process.env.USERNAME_FROM_GEONAMES_API

describe('City Service', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('fetches city suggestions successfully', async () => {
    const query = 'London';
    const response = {
      geonames: [
        { name: 'London' },
        { name: 'London Borough of Camden' },
        { name: 'London Borough of Hammersmith and Fulham' }
      ]
    };

    mock.onGet(`http://api.geonames.org/searchJSON?q=${query}&maxRows=5&username=${USERNAME}`).reply(200, response);

    const results = await searchCity(query);

    expect(results).toEqual(['London', 'London Borough of Camden', 'London Borough of Hammersmith and Fulham']);
  });

  it('returns an empty array when there is an error', async () => {
    const query = 'UnknownCity';

    mock.onGet(`http://api.geonames.org/searchJSON?q=${query}&maxRows=5&username=${USERNAME}`).reply(404);

    const results = await searchCity(query);

    expect(results).toEqual([]);
  });
});
