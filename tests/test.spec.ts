import { test, expect } from '@playwright/test';
import { generateTestEmail, getOtpFromEmail } from '../utils/mailosaurHelper.js';

test('Signup flow with email OTP verification', async ({ page }) => {
  // 1. Go to the site
  await page.goto('https://playground.mailslurp.com/');

  // 2. Navigate to signup form
  await page.click("//a[text()='Create account']");

  // 3. Generate unique email
  const testEmail = await generateTestEmail();
  const testPassword = 'StrongPassword123!';

  // 4. Fill signup form
  await page.fill('//input[@name="email"]', testEmail);
  await page.fill('//input[@name="password"]', testPassword);
  await page.click('//button[text()="Create Account"]');

  // 5. Fetch OTP from Mailosaur
  const otpCode = await getOtpFromEmail(testEmail);
  console.log(`OTP received: ${otpCode}`);

  // 6. Enter OTP in input
  await page.fill('//input[@name="code"]', otpCode);
  await page.click('//button[text()="Confirm"]');
  await page.waitForTimeout(3000);


  await page.fill('//input[@name="username"]', testEmail);
  await page.fill('//input[@name="password"]', testPassword);
  await page.click('//button[text()="Sign In"]');


  // 7. Submit OTP if needed
  // (depends on your UI; add button click if required)
  // await page.click('//button[text()="Verify"]');

  // 8. Assertion (example: check successful signup message)
  // await expect(page.locator('text=Account created successfully')).toBeVisible();
});
