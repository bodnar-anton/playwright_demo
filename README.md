# Playwright Demo Project
This is a demo project utilizing Playwright for the web test automation.

## Project Structure
- **.github/workflows/** - GitHub Actions workflow configurations.
- **node_modules/** - directory containing project dependencies installed via npm.
- **src/helper/** - utility functions and helper classes for the testing.
- **src/test/pages/** - page object classes representing different application pages.
- **src/test/specs/** - test case files written in TypeScript for various scenarios.
- **.env.example** - example environment variables template.
- **.gitignore** - git configuration file specifying ignored files and directories.
- **package.json** - Node.js package configuration file.
- **playwright.config.ts** - Playwright configuration file.
- **tsconfig.json** - TypeScript compiler configuration.

## Getting Started
1. **Install Dependencies:**
   ```sh
   npm install
   ```

2. **Install Playwright browsers:**
   ```sh
   npx playwright install
   ```

3. **Set Environment Variables:**
   - Create a copy of `.env.example` as `.env`.
   - Fill in the necessary environment variables required for the project.

## Running Tests
Tests are executed using the following command:

```sh
npm run test:all
```

## Running Tests in Headless Mode
To run tests in headless mode, follow these steps:

1. Open the `playwright.config.ts` file.
2. Locate the configuration for the browser you want to run in headless mode (e.g., Chromium).
3. Update the `headless` option to `true`:

   ```typescript
   export default defineConfig({
     projects: [
       {
         name: 'chromium',
         use: { ...devices['Desktop Chrome'], headless: true }, // Set headless to true for headless mode
       },
     ],
   });
   ```

   Ensure the `headless` option is set to `true` for the desired browser(s).

4. Run the tests using the following command:

   ```sh
   npm run test:all
   ```

This will execute the tests in headless mode, meaning the browser will run in the background without a visible user interface. You can check the test results and any errors in the terminal output.

## Viewing Allure Report
1. Generate the Allure report by running:

   ```sh
   npm run allure:generate
   ```

2. Open the generated Allure report in the browser:

   ```sh
   npm run allure:open
   ```

This will open the Allure report in your default web browser, allowing you to view detailed test results and analysis.

## Running Tests in GitHub Actions
This project is configured to run tests automatically in GitHub Actions based on the inputs provided. The GitHub Actions workflow file (`.github/workflows/playwright.yml`) includes the necessary steps to run the tests and upload the test results. The workflow is triggered either manually or on specific events.

### Manual Trigger:
1. Click on the «Actions» tab in your GitHub repository.
2. Select the «Playwright Tests» workflow from the list of workflows.
3. Click the «Run workflow» button.
4. Provide the required inputs (Environment and Suite to run) and click «Run workflow».

**Inputs:**
- **Environment** - the base URL of the application to test.
- **Suite to run** - the suite of tests to execute.

The provided inputs (Environment and Suite to run) determine the test configuration.

### Automated Trigger (On Specific Events):
The workflow is also automatically triggered when a new commit is pushed, or when a pull request is created. 

The workflow includes the following steps:
1. **Checkout** - checks out the repository code.
2. **Install Node** - sets up the appropriate Node.js version.
3. **Install Dependencies** - installs project dependencies.
4. **Install Playwright Browsers** - installs Playwright browsers.
5. **Run Playwright Tests** - executes Playwright tests based on the provided suite name.
6. **Upload Test Results** - uploads the generated report as an artifact.

You can view the test results and reports in the Actions tab of your GitHub repository.
