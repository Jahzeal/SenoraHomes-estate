import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Set a mobile viewport
        await page.set_viewport_size({"width": 375, "height": 667})

        # Go to the local HTML file
        await page.goto("file:///app/index.html")

        # Verify initial state: nav-links are hidden
        nav_links_visible = await page.is_visible(".nav-links")
        print(f"Initial state: nav-links visible? {nav_links_visible}")

        # Click the hamburger button
        await page.click("#hamburger")

        # Wait for the nav-links to become visible
        await page.wait_for_selector(".nav-links.active", state="visible")

        # Verify that nav-links are now visible
        nav_links_visible_after_click = await page.is_visible(".nav-links")
        print(f"After click: nav-links visible? {nav_links_visible_after_click}")

        # Take a screenshot
        await page.screenshot(path="/home/swebot/jules-scratch/verification/hamburger_test.png")

        await browser.close()

asyncio.run(main())
