from selenium.webdriver.common.by import By

from BasePage import BasePage

URL = "http://localhost/"

#HomePage
SIGN_IN_XPATH = (By.XPATH, "//a[@href='/#/login']")
SIGN_IN = (By.XPATH, '//a[@href="/#/login"]')
REGISTRATION = (By.XPATH, "//a[@href='/#/register']")
USER = (By.XPATH, "//li/a[@href='/#/user_profile/info']")

#SignInPage
EMAIL = (By.XPATH, "//input[@id='email']")
PASS = (By.XPATH, "//input[@id='password']")
SUBMIT_BTN = (By.XPATH, "//button[@type='submit']")


class HomePage(BasePage):
    # def __init__(self, driver):
    #     BasePage.__init__(self, driver)

    @property
    def url(self):
        return URL

    @property
    def sign_in(self):
        return self.base_find_element(*SIGN_IN)

    @property
    def registration(self):
        return self.base_find_element(*REGISTRATION)

    @property
    def user(self):
        return self.base_find_element(*USER)


class SignInPage(BasePage):
    def __init__(self, driver):
        BasePage.__init__(self, driver)

    @property
    def email(self):
        return self.base_find_element(*EMAIL)

    @property
    def password(self):
        return self.base_find_element(*PASS)

    @property
    def submit_btn(self):
        return self.base_find_element(*SUBMIT_BTN)


class RegistrationPage(BasePage):
    pass


class MapPage(BasePage):
    pass


class ResourcePage(BasePage):
    pass


class StatisticsPage(BasePage):
    pass