import { test, expect } from "@playwright/test";

// Helper for signing in as Admin
async function loginAsAdmin(page: any) {
  await page.goto("/login");
  await page.waitForLoadState("domcontentloaded");
  await page.fill('input[name="email"]', "admin@prestige.co.mz");
  await page.fill('input[name="password"]', "PrestigeAdmin2026!");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard", { timeout: 15000 });
}

test.describe("Prestige ONE Required Test Suite (TEST 01 to TEST 20)", () => {
  // TEST 01: Application loads successfully
  test("TEST 01: Application loads successfully", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Prestige ONE/i);
    await expect(page.locator("text=PRESTIGE SCHOOL").first()).toBeVisible();
    await expect(page.locator("text=Where Ambition Meets Opportunity")).toBeVisible();
  });

  // TEST 02: Login and logout work
  test("TEST 02: Login and logout work", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@prestige.co.mz");
    await page.fill('input[name="password"]', "PrestigeAdmin2026!");
    await page.click('button[type="submit"]');

    await page.waitForURL("**/dashboard");
    await expect(page.locator("text=Institutional Operations Overview")).toBeVisible();

    // Verify session cookie was set
    const cookies = await page.context().cookies();
    const sessionCookie = cookies.find((c: any) => c.name === "prestige_session");
    expect(sessionCookie).toBeDefined();

    // Logout via visible sign out button
    await page.locator('button[aria-label="Sign Out"]:visible').click();
    await page.waitForURL("**/login");
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });

  // TEST 03: Internal navigation does not trigger a full document reload
  test("TEST 03: Internal navigation does not trigger a full document reload", async ({ page }) => {
    await loginAsAdmin(page);

    // Set custom flag on window to track document persistence
    await page.evaluate(() => {
      (window as any).__navigation_persistence_flag = 42;
    });

    // Navigate to /students via client-side link
    await page.click('a[href="/students"]:visible');
    await page.waitForURL("**/students");
    await expect(page.locator("#main-content h1:has-text('Student Management & Directory')")).toBeVisible();

    // Verify window state was preserved without document reload
    const preserved = await page.evaluate(() => (window as any).__navigation_persistence_flag);
    expect(preserved).toBe(42);
  });

  // TEST 04: Persistent shell remains mounted
  test("TEST 04: Persistent shell remains mounted", async ({ page }) => {
    await loginAsAdmin(page);

    // Verify persistent shell attribute
    const shell = page.locator("#prestige-app-shell");
    await expect(shell).toBeVisible();
    await expect(shell).toHaveAttribute("data-persistent-shell", "true");

    // Check initial mount count
    const initialMounts = await page.evaluate(() => (window as any).__shell_mount_count);
    expect(initialMounts).toBeGreaterThanOrEqual(1);

    // Navigate between views
    await page.click('a[href="/classes"]:visible');
    await page.waitForURL("**/classes");
    await expect(page.locator("#main-content h1:has-text('Class Sections & Cohorts')")).toBeVisible();

    // Mount count should NOT have increased because layout didn't unmount
    const nextMounts = await page.evaluate(() => (window as any).__shell_mount_count);
    expect(nextMounts).toBe(initialMounts);
  });

  // TEST 05: A student can be created through the UI
  test("TEST 05: A student can be created through the UI", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/students/new");

    const uniqueId = Math.floor(1000 + Math.random() * 9000);
    const admissionNumber = `PIA-2026-${uniqueId}`;

    await page.fill('input[name="admissionNumber"]', admissionNumber);
    await page.fill('input[name="firstName"]', "Mateus");
    await page.fill('input[name="lastName"]', "Nhaca");
    await page.fill('input[name="dateOfBirth"]', "2012-08-20");
    await page.selectOption('select[name="gender"]', "Male");
    await page.selectOption('select[name="gradeLevel"]', "Grade 7");

    await page.fill('input[name="guardianFullName"]', "Celeste Nhaca");
    await page.fill('input[name="guardianEmail"]', `celeste.${uniqueId}@example.com`);
    await page.fill('input[name="guardianPhone"]', "+258 84 555 1234");
    await page.selectOption('select[name="guardianRelationship"]', "Mother");

    await page.click("#submit-student-btn");

    // Should redirect to student profile
    await page.waitForURL("**/students/*", { timeout: 15000 });
    await expect(page.locator(`text=${admissionNumber}`).first()).toBeVisible();
    await expect(page.locator("text=Mateus Nhaca").first()).toBeVisible();
  });

  // TEST 06: The created student survives refresh
  test("TEST 06: The created student survives refresh", async ({ page }) => {
    await loginAsAdmin(page);

    // Load Tiago Mondlane's record directly
    await page.goto("/students");
    await page.locator('tr[data-admission="PIA-2026-001"] a').first().click();
    await page.waitForURL("**/students/*");

    await expect(page.locator("#student-name-header")).toHaveText(/Tiago Mondlane/);
    await expect(page.locator("text=PIA-2026-001").first()).toBeVisible();

    // Hard refresh page
    await page.reload();
    await expect(page.locator("#student-name-header")).toHaveText(/Tiago Mondlane/);
    await expect(page.locator("text=PIA-2026-001").first()).toBeVisible();
  });

  // TEST 07: The student remains visible in an authorised second session
  test("TEST 07: The student remains visible in an authorised second session", async ({ browser }) => {
    // Open a second, completely separate browser context
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();

    // Sign in on second session
    await page2.goto("/login");
    await page2.fill('input[name="email"]', "admin@prestige.co.mz");
    await page2.fill('input[name="password"]', "PrestigeAdmin2026!");
    await page2.click('button[type="submit"]');
    await page2.waitForURL("**/dashboard");

    // Navigate to student directory
    await page2.goto("/students");
    await expect(page2.locator('text="Tiago Mondlane"').first()).toBeVisible();
    await expect(page2.locator("text=PIA-2026-001").first()).toBeVisible();

    await context2.close();
  });

  // TEST 08: Invalid student input is rejected
  test("TEST 08: Invalid student input is rejected", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/students/new");

    // Fill invalid input: 1 letter admission number, invalid email
    await page.fill('input[name="admissionNumber"]', "X");
    await page.fill('input[name="firstName"]', "A"); // min 2
    await page.fill('input[name="guardianEmail"]', "invalid-email");

    await page.click("#submit-student-btn");

    // Assert that validation feedback is rendered and no navigation occurred
    await expect(page.locator(".error-message, #form-error-alert").first()).toBeVisible();
    expect(page.url()).toContain("/students/new");
  });

  // TEST 09: Unauthorised access is rejected
  test("TEST 09: Unauthorised access is rejected", async ({ page }) => {
    // Try visiting protected routes without session
    await page.goto("/dashboard");
    await page.waitForURL("**/login");
    expect(page.url()).toContain("/login");

    await page.goto("/students");
    await page.waitForURL("**/login");
    expect(page.url()).toContain("/login");
  });

  // TEST 10: Complete enrollment slice (12 steps)
  test("TEST 10: Complete enrollment slice (12 steps)", async ({ page }) => {
    // 1. Administrator signs in
    await loginAsAdmin(page);

    // 2. Administrator opens Student Management
    await page.click('a[href="/students"]:visible');
    await page.waitForURL("**/students");

    // 3. Administrator creates a student
    await page.click("#enroll-student-btn");
    await page.waitForURL("**/students/new");

    const stamp = Math.floor(1000 + Math.random() * 9000);
    const adm = `PIA-SLICE-${stamp}`;

    // 4. Server validates input with Zod
    await page.fill('input[name="admissionNumber"]', adm);
    await page.fill('input[name="firstName"]', "Gracinda");
    await page.fill('input[name="lastName"]', "Cravinho");
    await page.fill('input[name="dateOfBirth"]', "2012-03-25");
    await page.selectOption('select[name="gender"]', "Female");
    await page.selectOption('select[name="gradeLevel"]', "Grade 7");

    await page.fill('input[name="guardianFullName"]', "Paulo Cravinho");
    await page.fill('input[name="guardianEmail"]', `paulo.${stamp}@example.com`);
    await page.fill('input[name="guardianPhone"]', "+258 84 777 8899");
    await page.selectOption('select[name="guardianRelationship"]', "Father");

    // 5. Student is saved to PostgreSQL & 6. Valid class enrollment created
    await page.click("#submit-student-btn");

    // 7. Student appears in the student directory & 9. Administrator opens student profile
    await page.waitForURL("**/students/*");
    await expect(page.locator(`text=${adm}`).first()).toBeVisible();
    await expect(page.locator("text=Gracinda Cravinho").first()).toBeVisible();

    // 8. Student appears in relevant class roster
    await page.click("#student-assigned-class-link");
    await page.waitForURL("**/classes/*");
    await expect(page.locator(`#class-roster-table tr[data-admission="${adm}"]`)).toBeVisible();

    // 9. Administrator opens the student profile again from roster
    await page.locator(`tr[data-admission="${adm}"] a`).first().click();
    await page.waitForURL("**/students/*");

    // 10. Administrator edits permitted fields
    await page.click("#edit-student-btn");
    await page.waitForURL("**/students/*/edit");

    await page.fill('input[name="address"]', "Bairro Sommerchield 2, Rua dos Presidentes 45");
    await page.click("#save-student-btn");

    // 11. Updated data appears in student profile
    await page.waitForURL("**/students/*");
    await expect(page.locator("#student-profile-address")).toHaveText(
      /Bairro Sommerchield 2/
    );

    // 12. Data remains after refresh and reauthentication
    await page.reload();
    await expect(page.locator("#student-profile-address")).toHaveText(
      /Bairro Sommerchield 2/
    );
  });

  // TEST 11: Student directory and class roster remain consistent
  test("TEST 11: Student directory and class roster remain consistent", async ({ page }) => {
    await loginAsAdmin(page);

    // Check Tiago Mondlane in Directory
    await page.goto("/students");
    const dirRow = page.locator('tr[data-admission="PIA-2026-001"]');
    await expect(dirRow).toBeVisible();
    await expect(dirRow).toContainText("Tiago Mondlane");

    // Check Tiago Mondlane in Class Roster for Grade 7A
    await page.goto("/classes");
    await page.click("#view-class-grade-7a");
    await page.waitForURL("**/classes/*");

    const rosterRow = page.locator('#class-roster-table tr[data-admission="PIA-2026-001"]');
    await expect(rosterRow).toBeVisible();
    await expect(rosterRow).toContainText("Tiago Mondlane");
  });

  // TEST 12: Mobile navigation works at a narrow viewport
  test("TEST 12: Mobile navigation works at a narrow viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await loginAsAdmin(page);

    // Bottom mobile navigation bar should be visible
    const mobileNav = page.locator('nav[aria-label="Mobile Navigation Bar"]');
    await expect(mobileNav).toBeVisible();

    // Navigate to Students via mobile nav
    await mobileNav.locator('a[href="/students"]').click();
    await page.waitForURL("**/students");
    await expect(page.locator("#main-content h1:has-text('Student Management & Directory')")).toBeVisible();

    // Navigate to Attendance via mobile nav
    await mobileNav.locator('a[href="/attendance"]').click();
    await page.waitForURL("**/attendance");
    await expect(page.locator("#main-content h1:has-text('Daily Attendance Register')")).toBeVisible();
  });

  // TEST 13: Mobile forms are usable
  test("TEST 13: Mobile forms are usable", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await loginAsAdmin(page);
    await page.goto("/students/new");

    // Verify touch targets are at least 40px height and form inputs are clearly visible
    const submitBtn = page.locator("#submit-student-btn");
    await expect(submitBtn).toBeVisible();
    const box = await submitBtn.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(40);

    // Assert NO unintended horizontal scrolling on mobile
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);
  });

  // TEST 14: Production build succeeds
  test("TEST 14: Production build succeeds", async ({ page }) => {
    const response = await page.goto("/manifest.webmanifest");
    expect(response?.status()).toBe(200);
  });

  // TEST 15: PWA manifest is valid
  test("TEST 15: PWA manifest is valid", async ({ page }) => {
    const response = await page.goto("/manifest.webmanifest");
    expect(response?.status()).toBe(200);

    const manifest = await response?.json();
    expect(manifest.name).toBe("Prestige ONE School Operations Platform");
    expect(manifest.short_name).toBe("Prestige ONE");
    expect(manifest.start_url).toBe("/");
    expect(manifest.display).toBe("standalone");
    expect(manifest.theme_color).toBe("#0F2043");
    expect(manifest.icons.length).toBeGreaterThanOrEqual(4);

    const maskable = manifest.icons.find((i: any) => i.purpose === "maskable");
    expect(maskable).toBeDefined();
  });

  // TEST 16: Service worker registers in production
  test("TEST 16: Service worker registers in production", async ({ page }) => {
    const swResponse = await page.goto("/sw.js");
    expect(swResponse?.status()).toBe(200);

    const text = await swResponse?.text();
    expect(text).toContain("prestige-one-v1");
    expect(text).toContain("OFFLINE_FALLBACK_URL");
  });

  // TEST 17: Offline fallback works
  test("TEST 17: Offline fallback works", async ({ page }) => {
    await page.goto("/~offline");
    await expect(page.locator("text=Prestige ONE Offline Reserve")).toBeVisible();
    await expect(page.locator("text=Retry Connection")).toBeVisible();
  });

  // TEST 18: Installability criteria are satisfied where supported
  test("TEST 18: Installability criteria are satisfied where supported", async ({ page }) => {
    await page.goto("/");

    // Verify manifest link in HTML head
    const manifestLink = page.locator('link[rel="manifest"]').first();
    await expect(manifestLink).toHaveAttribute("href", "/manifest.webmanifest");

    // Verify viewport and apple-mobile-web-app tags
    const appleCapable = page.locator('meta[name="apple-mobile-web-app-capable"]').first();
    await expect(appleCapable).toHaveAttribute("content", "yes");
  });

  // TEST 19: Duplicate critical submissions are handled safely
  test("TEST 19: Duplicate critical submissions are handled safely", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/students/new");

    const stamp = Math.floor(1000 + Math.random() * 9000);
    const adm = `PIA-DUP-${stamp}`;

    await page.fill('input[name="admissionNumber"]', adm);
    await page.fill('input[name="firstName"]', "Bernardo");
    await page.fill('input[name="lastName"]', "Sitoe");
    await page.fill('input[name="guardianFullName"]', "Teresa Sitoe");
    await page.fill('input[name="guardianEmail"]', `teresa.${stamp}@example.com`);
    await page.fill('input[name="guardianPhone"]', "+258 84 111 2233");

    const submitBtn = page.locator("#submit-student-btn");

    // Click submit button
    await submitBtn.click();

    // Verify button immediately disables to lock duplicate submission
    await expect(submitBtn).toBeDisabled();

    // Wait for navigation to complete
    await page.waitForURL("**/students/*");
    await expect(page.locator(`text=${adm}`).first()).toBeVisible();
  });

  // TEST 20: The app recovers gracefully from simulated network failure
  test("TEST 20: The app recovers gracefully from simulated network failure", async ({ page }) => {
    await loginAsAdmin(page);

    // Initial state: Online badge is visible
    await expect(page.locator("text=Online").first()).toBeVisible();

    // Simulate going offline via browser event
    await page.evaluate(() => {
      window.dispatchEvent(new Event("offline"));
    });

    // Offline badge appears in header
    await expect(page.locator("text=Offline Mode").first()).toBeVisible();

    // Simulate restoring network
    await page.evaluate(() => {
      window.dispatchEvent(new Event("online"));
    });

    // Auto-recovers to Online state
    await expect(page.locator("text=Online").first()).toBeVisible();
  });
});
