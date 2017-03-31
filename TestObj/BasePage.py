from selenium.common.exceptions import NoSuchElementException
import unittest

from TestObj.Locator import MainPageLocators


class BasePage(unittest.TestCase):
    def __init__(self, driver):
        unittest.TestCase.__init__(self)
        self.driver = driver


class MainPage(BasePage):

    def findElement(self, *locator):
        return self.driver.find_element(*locator)

    def checkPageLoaded(self):
        self.assertTrue(self.isElementPresent(*MainPageLocators.LOGO))

    def find_button(self):
        self.assertTrue(self.driver.find_element(*MainPageLocators.MAP))

    def click_button(self):
        self.driver.find_element(*MainPageLocators.BUTTON_LOGIN).click()

    def check_login_page(self):
        self.click_button()
        log = self.driver.find_element(*MainPageLocators.MAIL)
        passw = self.driver.find_element(*MainPageLocators.PASSWORD)
        log.send_keys('123')
        self.assertEqual('123',log.get_attribute("value"))
        passw.send_keys('456')
        self.assertEqual('456', passw.get_attribute('value'))

    def isElementPresent(self, *locator):
        try:
            self.findElement(*locator)
        except NoSuchElementException:
            return False
        return True
