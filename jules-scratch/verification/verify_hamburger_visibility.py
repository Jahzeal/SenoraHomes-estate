
from playwright.sync_api import sync_playwright
import os

def check_hamburger_visibility(page, page_name, viewport_name, expected_visible):
    hamburger = page.query_selector('.hamburger-menu')
    is_visible = hamburger and hamburger.is_visible()

    if is_visible != expected_visible:
        raise Exception(f"Hamburger menu visibility check failed for {page_name} on {viewport_name} viewport. Expected: {expected_visible}, Got: {is_visible}")

    screenshot_path = f'jules-scratch/verification/{page_name}_{viewport_name}.png'
    page.screenshot(path=screenshot_path)
    print(f"Verified hamburger visibility for {page_name} on {viewport_name}. Screenshot saved to {screenshot_path}")

def run():
    os.makedirs("jules-scratch/verification", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch()

        pages_to_test = ["index.html", "greenwich.html", "unit-options.html"]
        viewports = {
            "desktop": {'width': 1280, 'height': 720},
            "mobile": {'width': 375, 'height': 667}
        }

        for page_name in pages_to_test:
            for viewport_name, viewport_config in viewports.items():
                context = browser.new_context(viewport=viewport_config)
                page = context.new_page()
                page.goto(f'file://{os.getcwd()}/{page_name}')

                expected_visible = viewport_name == "mobile"
                check_hamburger_visibility(page, os.path.splitext(page_name)[0], viewport_name, expected_visible)

                context.close()

        browser.close()

if __name__ == "__main__":
    run()
