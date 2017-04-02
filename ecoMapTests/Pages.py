from selenium.webdriver.common.by import By
from ecoMapTests.BasePage import BasePage


class MainPage(BasePage):

    def click_sign_button(self):
        self.driver.find_element(*MainPageLocators.SIGNUP).click()
        return LoginPage(self.driver)

    def registration(self):
        pass


class LoginPage(BasePage):
    def login(self, email, password):
        self.driver.find_element(*LoginPageLocators.EMAIL).send_keys(email)
        self.driver.find_element(*LoginPageLocators.PASSWORD).send_keys(password)
        self.driver.find_element(*LoginPageLocators.LOGIN).click()

    def get_user(self):
        return self.driver.find_element(*LoginPageLocators.USER).text


class StatisticsPage(BasePage):
    pass


class ResourcesPage(BasePage):
    pass


class MainPageLocators(object):
    SIGNUP = (By.XPATH, '//*[@id="loginField"]')


class LoginPageLocators(object):
    EMAIL = (By.ID, 'email')
    PASSWORD = (By.ID, 'password')
    LOGIN = (By.XPATH, '//*[@type="submit"]')
    USER = (By.XPATH, '//*[@href="/#/user_profile/info"]')






