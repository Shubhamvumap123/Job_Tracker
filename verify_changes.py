from playwright.sync_api import sync_playwright
import time
import random
import string
import json

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))

        # generate random user
        rand_suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
        email = f"user_{rand_suffix}@example.com"
        password = "Password123!"
        name = f"Test User {rand_suffix}"

        print(f"Registering user: {email}")

        # 1. Register
        page.goto("http://localhost:5173/register")
        page.fill("input[name='name']", name)
        page.fill("input[name='email']", email)
        page.fill("input[name='password']", password)
        page.fill("input[name='confirmPassword']", password)

        page.click("button[type='submit']")

        # Wait for navigation to dashboard
        try:
            page.wait_for_url("http://localhost:5173/", timeout=15000)
            print("Registration successful, redirected to dashboard")
        except:
            print("Registration timeout or failure. Current URL:", page.url)
            return

        # 2. Create Ticket
        print("Creating a ticket...")

        page.locator("button:has-text('Create Ticket')").first.click()

        # Wait for modal
        page.wait_for_selector("text=Create New Ticket", timeout=5000)

        ticket_title = f"Test Ticket {rand_suffix}"

        page.fill("input[placeholder*='e.g., Login page']", ticket_title)
        page.fill("textarea[placeholder*='Describe the issue']", "This is a test description.")

        # Click Create
        page.locator("button:has-text('Create Ticket')").last.click()

        # Wait for creation to complete (modal close)
        page.wait_for_selector("text=Create New Ticket", state="hidden", timeout=5000)
        print("Ticket created.")

        # 3. Go to Ticket List
        print("Navigating to ticket list...")
        page.goto("http://localhost:5173/tickets")

        # Wait for ticket to appear in list
        print(f"Waiting for ticket '{ticket_title}' to appear...")
        try:
             page.wait_for_selector(f"text={ticket_title}", timeout=10000)
             print("Ticket visible in list.")
        except:
             print("Ticket verification failed. Screenshotting...")
             page.screenshot(path="verification_failure.png")
             return

        # 4. Edit Ticket
        print("Editing ticket...")
        # Locate the row
        row = page.locator(f"tr:has-text('{ticket_title}')")

        # Click edit button
        edit_btn = row.locator("button").first
        edit_btn.click(force=True)

        # Wait for Edit Modal
        page.wait_for_selector("text=Edit Ticket", timeout=5000)
        print("Edit modal opened")

        # Verify pre-filled data
        input_locator = page.locator(f"input[value='{ticket_title}']")
        if input_locator.count() > 0:
             print("Title pre-filled correctly")
        else:
             print(f"WARNING: Title input with value '{ticket_title}' not found.")

        # Change title
        new_title = ticket_title + " Updated"
        page.locator(f"input[value='{ticket_title}']").fill(new_title)

        page.click("button:has-text('Save Changes')")

        # Wait for modal to close
        page.wait_for_selector("text=Edit Ticket", state="hidden", timeout=5000)
        print("Edit modal closed")

        # Verify list update
        try:
             page.wait_for_selector(f"text={new_title}", timeout=5000)
             print("Ticket list updated with new title")
        except:
             print("Update verification failed.")
             page.screenshot(path="verification_failure.png")
             return

        # Take screenshot
        page.screenshot(path="verification.png")
        print("Screenshot saved to verification.png")

        browser.close()

if __name__ == "__main__":
    verify_app()
