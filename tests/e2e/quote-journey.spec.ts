import { expect, Page, test } from "@playwright/test";

/**
 * Quote Journey Master Test
 * Tests the complete quote journey from homepage to payment
 */

// Page-specific test functions
async function testHomepage(page: Page) {
  console.log("Testing homepage navigation...");

  // Navigate to homepage
  await page.goto("/");

  // Verify we're on the homepage
  await expect(page).toHaveTitle(/Velosure/);

  // Find and click the "Get a quote" button
  const quoteButton = page.locator("text=Get a quote").first();
  await expect(quoteButton).toBeVisible();

  // Click the quote button
  await quoteButton.click();

  // Verify navigation to quote journey
  await expect(page).toHaveURL(/\/get-a-quote/);
  console.log("✓ Homepage navigation successful");
}

async function testStepOne(page: Page) {
  console.log("Testing Step One - Bike Details...");

  // Verify we're on Step One
  await expect(page.locator("text=Your bike insurance quote")).toBeVisible();

  // Fill bike details form
  const bikeMake = page.locator("#bikeMake");
  await expect(bikeMake).toBeVisible();
  await bikeMake.fill("Trek");

  const bikeModel = page.locator("#bikeModel");
  await expect(bikeModel).toBeVisible();
  await bikeModel.fill("FX 3");

  const bikeValue = page.locator("#bikeValue");
  await expect(bikeValue).toBeVisible();
  await bikeValue.fill("800");

  // Select electric bike option (No)
  const electricNoButton = page.locator("text=No").first();
  await expect(electricNoButton).toBeVisible();
  await electricNoButton.click();

  // Click "Add this bike" button
  const addBikeButton = page.locator("#Add-this-bike");
  await expect(addBikeButton).toBeVisible();
  await addBikeButton.click();

  // Wait for bike to be added (brief pause for state update)
  await page.waitForTimeout(500);

  // Select bike storage location (Home)
  const homeStorageButton = page.locator("#bikeStorage1");
  await expect(homeStorageButton).toBeVisible();
  await homeStorageButton.click();

  // Answer previous claims question (No)
  const noClaimsButton = page.locator("text=No").first();
  await expect(noClaimsButton).toBeVisible();
  await noClaimsButton.click();

  // Click Next Step button
  const nextButton = page.locator("#move-to-step-two");
  await expect(nextButton).toBeVisible();
  await nextButton.click();

  // Verify navigation to Step Two
  await expect(page).toHaveURL(/\/stepTwo/);
  console.log("✓ Step One completed successfully");
}

async function testStepTwo(page: Page) {
  console.log("Testing Step Two - Personal Details...");

  // Verify we're on Step Two
  await expect(page.locator("text=About you")).toBeVisible();

  // Select title
  const titleMr = page.locator("#title1");
  await expect(titleMr).toBeVisible();
  await titleMr.click();

  // Fill personal details
  const firstName = page.locator("#forename");
  await expect(firstName).toBeVisible();
  await firstName.fill("John");

  const lastName = page.locator("#surname");
  await expect(lastName).toBeVisible();
  await lastName.fill("Doe");

  // Select date of birth
  const dobDay = page.locator("#dob_d");
  await expect(dobDay).toBeVisible();
  await dobDay.selectOption("15");

  const dobMonth = page.locator("#dob_m");
  await expect(dobMonth).toBeVisible();
  await dobMonth.selectOption("6");

  const dobYear = page.locator("#dob_y");
  await expect(dobYear).toBeVisible();
  await dobYear.selectOption("1990");

  // Fill contact details
  const email = page.locator("#email");
  await expect(email).toBeVisible();
  await email.fill("john.doe@example.com");

  const phone = page.locator("#telephoneNo");
  await expect(phone).toBeVisible();
  await phone.fill("07123456789");

  // Fill address details (simplified - would need to handle address lookup)
  const postcodeInput = page.locator('input[name*="postcode"]').first();
  if (await postcodeInput.isVisible()) {
    await postcodeInput.fill("SW1A 1AA");
  }

  // For demo purposes, we'll assume address lookup works and we can proceed
  // In a real test, you might need to handle the address lookup functionality

  // Click Next Step button
  const nextButton = page.locator("text=Next step").first();
  await expect(nextButton).toBeVisible();
  await nextButton.click();

  // Verify navigation to Step Three
  await expect(page).toHaveURL(/\/stepThree/);
  console.log("✓ Step Two completed successfully");
}

async function testStepThree(page: Page) {
  console.log("Testing Step Three - Coverage Options...");

  // Verify we're on Step Three
  await expect(page.locator("text=Your bike insurance quote")).toBeVisible();

  // Wait for quote to load (Step Three generates the quote)
  await page.waitForTimeout(3000); // Adjust based on actual loading times

  // Verify quote details are displayed
  await expect(page.locator("text=Your quote")).toBeVisible();

  // Select a coverage option (Core or Performance)
  // This would typically involve clicking on a coverage card or button
  const coverageOption = page.locator("text=Core").first();
  if (await coverageOption.isVisible()) {
    await coverageOption.click();
  }

  // Click Next Step button
  const nextButton = page.locator("#move-to-step-four");
  await expect(nextButton).toBeVisible();
  await nextButton.click();

  // Verify navigation to Step Four
  await expect(page).toHaveURL(/\/stepFour/);
  console.log("✓ Step Three completed successfully");
}

async function testStepFour(page: Page) {
  console.log("Testing Step Four - Quote Summary and Payment...");

  // Verify we're on Step Four
  await expect(page.locator("text=Your bike insurance quote")).toBeVisible();

  // Verify quote summary is displayed
  await expect(page.locator("text=Your quote")).toBeVisible();

  // Accept terms and conditions
  const termsCheckbox = page.locator('input[type="checkbox"]').first();
  if (await termsCheckbox.isVisible()) {
    await termsCheckbox.check();
  }

  // Select payment method (if options are available)
  const paymentMethod = page.locator("text=Card").first();
  if (await paymentMethod.isVisible()) {
    await paymentMethod.click();
  }

  // For demo purposes, we won't actually complete payment
  // In a real test, you might fill payment details and submit
  console.log("✓ Step Four completed successfully (payment simulation)");
}

// Master test function that orchestrates the entire journey
async function runQuoteJourneyTest(page: Page) {
  console.log("🚀 Starting Quote Journey Master Test...");

  try {
    // Run each step in sequence
    await testHomepage(page);
    await testStepOne(page);
    await testStepTwo(page);
    await testStepThree(page);
    await testStepFour(page);

    console.log("✅ Quote Journey Master Test completed successfully!");
  } catch (error) {
    console.error("❌ Quote Journey Test failed:", error);
    throw error;
  }
}

// Playwright test
test.describe("Quote Journey", () => {
  test("Complete quote journey from homepage to payment", async ({ page }) => {
    // Set up base URL for local development
    // In production, this would point to the live site
    await page.goto("http://localhost:5173");

    // Run the complete journey
    await runQuoteJourneyTest(page);
  });

  // test("Homepage quote button navigation", async ({ page }) => {
  //   await page.goto("http://localhost:5173");
  //   await testHomepage(page);
  // });

  // test("Step One bike details form", async ({ page }) => {
  //   await page.goto("http://localhost:5173/get-a-quote");
  //   await testStepOne(page);
  // });

  // test("Step Two personal details form", async ({ page}) => {
  //   // Note: This test would need proper setup with bike data
  //   // For now, it's a placeholder
  //   await testStepTwo(page);
  //   console.log("Step Two test requires proper journey state setup");
  // });

  // test("Step Three coverage selection", async () => {
  //   // Note: This test would need proper setup with personal details
  //   // For now, it's a placeholder
  //   console.log("Step Three test requires proper journey state setup");
  // });

  // test("Step Four payment setup", async () => {
  //   // Note: This test would need proper setup with coverage selection
  //   // For now, it's a placeholder
  //   console.log("Step Four test requires proper journey state setup");
  // });
});
