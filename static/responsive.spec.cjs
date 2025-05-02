const { test, expect } = require('@playwright/test');

test.describe('Responsive layout', () => {
  test('desktop', async ({page}) => {
    await page.goto('http://localhost:8000'); // Change as needed
    await page.setViewportSize({ width: 1025, height: 800});
    const left = await page.locator('.left-column').boundingBox();
    const main = await page.locator('.main-column').boundingBox();
    const right = await page.locator('.right-column').boundingBox();
    expect(left.x).toBeLessThan(main.x);
    expect(main.x).toBeLessThan(right.x);
  });
  test('tablet', async ({page}) => {
    await page.goto('http://localhost:000');
    await page.setViewportSize({ width: 1024, height: 800});
    const left = await page.locator('.left-column').boundingBox();
    const main = await page.locator('.main-column').boundingBox();
    const right = await page.locator('.right-column').boundingBox();
    expect(left.y).toBeGreaterThan(main.y); // left column goes under main column in tablet form
  });
  test('mobile', async ({page}) => {
    await page.goto('http://localhost:8000');
    await page.setViewportSize({width: 724, height: 800});
    const left = await page.locator('.left-column').boundingBox();
    const main = await page.locator('.main-column').boundingBox();
    const right = await page.locator('.right-column').boundingBox();
    expect(main.y).toBeGreaterThan(left.y);
    expect(right.y).toBeGreaterThan(main.y);
    });
});