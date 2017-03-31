

class PageElement(object):

    def __set__(self, driver, value):
        driver.find_element_by_name(self.locator).send_keys(value)

    def __get__(self, driver):
        element = driver.find_element_by_name(self.locator)
        return element.get_attribute("value")