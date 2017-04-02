from Pages import HomePage, SignInPage
from BaseStep import BaseStep


class HomeSteps(BaseStep):

    def __init__(self, driver):
        BaseStep.__init__(self, driver)
        self.home_page = HomePage(self.driver)

    def open(self):
        self.driver.get(self.home_page.url)

    def click_sign_in(self):
        self.home_page.sign_in.click()

    def click_registration(self):
        self.home_page.registration.click()

    def get_user_name(self):
        return self.home_page.user.text


class SignInSteps(BaseStep):

    def __init__(self, driver):
        BaseStep.__init__(self, driver)
        self.sign_in_page = SignInPage(self.driver)

    def type_email(self, email):
        self.sign_in_page.email.clear()
        self.sign_in_page.email.send_keys(email)

    def type_password(self, password):
        self.sign_in_page.password.clear()
        self.sign_in_page.password.send_keys(password)

    def click_submit_btn(self):
        self.sign_in_page.submit_btn.click()


class RegistrationSteps(BaseStep):
    pass


class MapSteps(BaseStep):
    pass


class ResourceSteps(BaseStep):
    pass


class StatisticsSteps(BaseStep):
    pass