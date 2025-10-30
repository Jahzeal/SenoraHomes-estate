
from playwright.sync_api import sync_playwright
import os

def run():
    # Create the verification directory if it doesn't exist
    os.makedirs("jules-scratch/verification", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        # Define a mobile viewport
        context = browser.new_context(
            viewport={'width': 375, 'height': 667}
        )
        page = context.new_page()

        # Navigate to the local HTML file
        # Make sure the path to the file is correct
        page.goto(f'file://{os.getcwd()}/unit-options.html')

        # Take a screenshot before clicking the hamburger icon
        page.screenshot(path='jules-scratch/verification/unit-options_before_click.png')

        # Click the hamburger icon
        page.click('.hamburger-menu')

        # Wait for the navigation to be visible (optional, but good practice)
        page.wait_for_selector('.nav-links.active', state='visible')

        # Take a screenshot after clicking the hamburger icon
        page.screenshot(path='jules-scratch/verification/unit-options_after_click.png')

        browser.close()

if __name__ == "__main__":
    run()
