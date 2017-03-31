from selenium.webdriver.common.by import By


class MainPageLocators(object):
    MAIL = (By.XPATH, '//*[@id="email"]')
    LOGO = (By.CSS_SELECTOR, ".navbar-brand > img:nth-child(1)")
    MAP = (By.CSS_SELECTOR, '.gm-style > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)')
    BUTTON_RESOURSES = (By.CSS_SELECTOR, '#navMenu > ul:nth-child(1) > li.dropdown.open > a')
    BUTTON_STAT = (By.XPATH, '//*[@id="navMenu"]/ul[1]/li[2]/a')
    BUTTON_LOGIN = (By.XPATH, '//*[@id="loginField"]/a')
    BUTTON_SIGNUP = (By.XPATH, '//*[@id="navMenu"]/ul[2]/li[2]/a')
    PASSWORD = (By.XPATH, '//*[@id="password"]')
    TEST_MAIL = None


