from selenium.webdriver.common.by import By

from BasePage import BasePage

URL = "localhost"

# HomePage
SIGN_IN = (By.XPATH, "//a[@href='/#/login']")
REGISTRATION = (By.XPATH, "//a[@href='/#/register']")

# SignInPage
EMAIL = (By.XPATH, "//input[@id='email']")
PASS = (By.XPATH, "//input[@id='password']")
SUBMIT_BTN = (By.XPATH, "//button[@type='submit']")


class HomePage(BasePage):
    def __init__(self, driver):
        BasePage.__init__(self, driver)

    def find_element(self, *locator):
        self.driver.find_element(*locator)

    @property
    def url(self):
        return self.url

    @property
    def sign_in(self):
        return self.find_element(SIGN_IN)

    @property
    def registration(self):
        return self.find_element(REGISTRATION)


class SignInPage(BasePage):
    def __init__(self, driver):
        BasePage.__init__(self, driver)

    def find_element(self, *locator):
        self.driver.find_element(*locator)

    @property
    def email(self):
        return self.find_element(EMAIL)

    @property
    def password(self):
        return self.find_element(PASS)

    @property
    def submit_btn(self):
        return self.find_element(SUBMIT_BTN)


class RegistrationPage(BasePage):
    pass


class MapPage(BasePage):
    pass


class ResourcePage(BasePage):
    pass


class StatisticsPage(BasePage):
    pass
