# AAB Vue Frontend Assignment

This is a Vue 3 + Vite TypeScript application with the following functionalities:

- Mocked service calls returning `public/*.json` files
- Accounts overview and drill-down to transaction history
- Search and date filter in the account detail

## Quick start:
```bash
npm install
npm run dev
```

## Tests:
There are 4 test suites that cover the application's functionalities:

### Vitests:
1. api.spec -> Tests that the mocked api call JSON files have some of the expected properties.
2. component.spec -> Tests that the Vue components work as expected by asserting whether they display the test data.
   Note: These tests follow the normal flow of the app that uses the api call to populate data, only that the data provided by the call is mocked in the test.
3. filters.spec -> Tests that the transaction filtering by name and date works correctly.
   Note: Compared to the component tests, these ones do not rely on the api call but directly set the component state.
```bash
npm run test
```

### Playwright
4. responsive.spec -> Specifically tests if the filters of the application are within the main container. I added this test since intially the date filtering      would overlfow the container on smaller devices.
```bash
npm run test:e2e
```

## Notes:
- Public JSON files are copies of the provided reference files and used as mocked API responses