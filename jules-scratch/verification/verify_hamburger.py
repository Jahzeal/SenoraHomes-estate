
from playwright.sync_api import sync_playwright
import os

def run():
    # Create the verification directory if it doesn't exist
    os.makedirs("jules-scratch/verification", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        # Define a desktop viewport
        context = browser.new_context(
            viewport={'width': 1280, 'height': 720}
        )
        page = context.new_page()

        # Navigate to the local HTML file
        page.goto(f'file://{os.getcwd()}/index.html')

        # Check if the hamburger menu is hidden
        hamburger = page.query_selector('.hamburger-menu')
        if hamburger and hamburger.is_visible():
            raise Exception("Hamburger menu is visible on desktop")

        # Take a screenshot
        page.screenshot(path='jules-scratch/verification/index_desktop.png')

        browser.close()

if __name__ == "__main__":
    run()
