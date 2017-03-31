from  selenium.common.exceptions import NoSuchElementException

class BasePage(object):

    def __init__(self, driver, url):
        self.url = url
        self.driver = driver

    def open(self):
        self.driver.get(self.url)

    def findElement(self, locator):
        try:
            return self.driver.find_element(locator[0], locator[1])
        except NoSuchElementException:
            return None
