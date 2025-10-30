from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_viewport_size({"width": 375, "height": 667})

        # Verify index.html
        page.goto(f"file://{os.getcwd()}/index.html")
        page.screenshot(path="jules-scratch/verification/index_before_click.png")
        page.click(".hamburger-menu")
        page.screenshot(path="jules-scratch/verification/index_after_click.png")

        browser.close()

run()
