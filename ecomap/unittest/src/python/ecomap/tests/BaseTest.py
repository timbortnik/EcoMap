from selenium import webdriver


class BaseTest(object):
    def __init__(self):
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.driver.implicitly_wait(2)

    @property
    def driver(self):
        return self.driver
