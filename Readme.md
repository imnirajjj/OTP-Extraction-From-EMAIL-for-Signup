# Playwright Signup Automation with Mailosaur

This project automates the signup flow of a web application using Playwright with JavaScript, including OTP email verification with Mailosaur.

## Features
- Automates user signup flow.
- Extracts OTP from Mailosaur email.
- Uses XPath and CSS selectors for precise element targeting.
- Includes delays where necessary to ensure proper element rendering.

## Prerequisites
- Node.js installed (https://nodejs.org/)
- Mailosaur account (https://mailosaur.com/)
- Playwright installed globally or via project dependencies

## Installation
```bash
# Clone this repository
git clone <your-repo-url>

# Navigate into the folder
cd mailosaur-tests

# Install dependencies
npm install
```

## Project Structure
```
mailosaur-tests/
│
├── tests/
│   └── test.spec.js        # Main Playwright test file
├── utils/
│   └── mailosaurHelper.js  # Mailosaur helper for OTP extraction
├── package.json
└── README.md
```

## Running the Test
```bash
npx playwright test tests/test.spec.js --headed
```
- Use `--headed` to run in headed mode.
- Use `--headed --slow-mo 1000` to slow down steps for debugging.

## Example Test Code
```javascript
await page.goto('https://example.com/signup');

// Fill signup form
await page.fill('//input[@name="email"]', testEmail);
await page.fill('//input[@name="password"]', 'Password123');

// Click confirm button and wait
await page.click('//button[text()="Confirm"]');
await page.waitForTimeout(3000); // wait for 3 seconds

// Get OTP from Mailosaur
const otp = await getOtpFromEmail(testEmail);
await page.fill('//input[@name="otp"]', otp);
await page.click('//button[text()="Verify"]');
```

## Notes
- Make sure you have configured your Mailosaur server ID correctly in `mailosaurHelper.js`.
- Ensure the test email domain matches your Mailosaur server.

---
Happy Testing with Playwright 🚀
