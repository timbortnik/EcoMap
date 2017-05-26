from selenium.common.exceptions import NoSuchElementException
BASE_URL = "http://localhost/#/map"


class BasePage(object):

    def __init__(self, driver):
        self.driver = driver
        self.url = BASE_URL
        driver.implicitly_wait(30)
        driver.maximize_window()

    def open_main_page(self):
        self.driver.get(self.url)

    def get_title(self):
        return self.driver.title

    def get_url(self):
        return self.driver.current_url

    def open_statistic(self):
        # return statistics page

        pass

    def open_resources(self):
        # return resources page
        pass

    def is_logo_present(self):
        try:
            self.driver.find_element_by_xpath('//*[@src="/image/logo.png"]')
        except NoSuchElementException:
            return False
        return True

    def is_element_present(self, *locator):
        try:
            self.driver.find_element(*locator)
        except NoSuchElementException:
            return False
        return True

