from selenium.webdriver.common.by import By

class Locator(object):
    def __init__(self, by, value):
        self.by = by
        self.value = value

    def __get__(self):
        return [self.by, self.value]


class MainPageLocators(object):
    LOGIN = [By.XPATH, '//*[@id="loginField"]/a']
    REGISTER = [By.XPATH, '//*[@id="navMenu"]/ul[2]/li[2]']
    LOGO = [By.XPATH, '/html/body/div[1]/nav/div/div[1]/a/img']

class LoginPageLocators(object):
    EMAIL_FIELD = [By.ID, 'email']
    PASSWORD_FIELD = [By.ID, 'password']
    ENTER_BUTTON = [By.XPATH, '/html/body/div[1]/div[4]/div[1]/div/div/div/form/div/div[2]/button[1]']
    ENTER_USING_FACEBOOK_BUTTON = [By.XPATH, '/html/body/div[1]/div[4]/div[1]/div/div/div/form/div/div[2]/button[2]']

class MainUserPageLocators(object):
    LOGOUT = [By.XPATH, '//*[@id="navMenu"]/ul[2]/li[2]/a']

