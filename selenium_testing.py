import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

class MovieListingTest(unittest.TestCase):

    def setUp(self):
        # Set up the WebDriver. You can choose a different driver if needed.
        self.driver = webdriver.Chrome()  # Ensure you have chromedriver installed and in your PATH
        self.driver.implicitly_wait(10)  # Wait up to 10 seconds for elements to appear

    def test_movies_header(self):
        driver = self.driver
        # Navigate to the movie listing site
        driver.get("http://movielisting.azurewebsites.net")

        # Locate the element by the specified CSS selector
        element = driver.find_element(By.CSS_SELECTOR, "#root > div > div:nth-child(1) > div:nth-child(1) > h1")

        # Check if the text "Movies" is in the located element
        self.assertIn("Movies", element.text)

        search_input = driver.find_element(By.CSS_SELECTOR, "#root > div > div:nth-child(1) > div.col.col-sm-4 > input")

        # Input "Lion King" into the search field
        search_input.send_keys("Lion King")

        # Wait for 5 seconds
        time.sleep(5)

        # Locate the target element to check for child elements
        target_element = driver.find_element(By.CSS_SELECTOR, "#root > div > div:nth-child(2)")

        # Check if the target element has any child elements
        children = target_element.find_elements(By.XPATH, "./*")
        self.assertGreater(len(children), 0, "Results not shown")
                # Click on the first result's span element
        first_result_span = driver.find_element(By.CSS_SELECTOR, "#root > div > div:nth-child(2) > div:nth-child(1) > div > span")
        first_result_span.click()

        # Wait for 1 second to allow the details to load
        time.sleep(1)

        # Locate the details element to check for child elements
        details_container = driver.find_element(By.CSS_SELECTOR, "#root > div > div:nth-child(4)")
        details_children = details_container.find_elements(By.XPATH, "./*")
        self.assertGreater(len(details_children), 0, "Adding to Favorites functionality not working")

        clear_details_span = driver.find_element(By.CSS_SELECTOR, "#root > div > div:nth-child(4) > div > div > span")
        clear_details_span.click()

        # Wait for 1 second to allow the action to take effect
        time.sleep(1)

        # Verify that the details container has no child elements
        details_children_after_clear = details_container.find_elements(By.XPATH, "./*")
        self.assertEqual(len(details_children_after_clear), 0, "Unable to clear Favorites tab.")
    def tearDown(self):
        # Close the browser window
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
