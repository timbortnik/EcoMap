from pages import BasePage
from pages.Locators import MainPageLocators
from pages.Locators import LoginPageLocators
from pages.Locators import MainUserPageLocators

class MainPage(BasePage.BasePage):

    def click_login(self):
        element = self.findElement(MainPageLocators.LOGIN)
        element.click()

    def clock_logo(self):
        element = self.findElement(MainPageLocators.LOGO)
        element.click()

class LoginPage(BasePage.BasePage):
    def enter_credentials(self, email, password):
        email_field = self.findElement(LoginPageLocators.EMAIL_FIELD)
        password_field = self.findElement(LoginPageLocators.PASSWORD_FIELD)

        email_field.send_keys(email)
        password_field.send_keys(password)

        self.findElement(LoginPageLocators.ENTER_BUTTON).click()


class MainUserPage(BasePage.BasePage):
    def logout(self):
        self.findElement(MainUserPageLocators.LOGOUT).click()