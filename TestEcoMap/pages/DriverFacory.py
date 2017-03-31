from selenium import webdriver
import os

class DriverFactory(object):

    def get_driver(self, browser_name):
        if browser_name == "chrome":
            chrome_driver_path = os.path.dirname(os.path.abspath(__file__)) + "/chromedriver"
            driver = webdriver.Chrome(chrome_driver_path)
            return driver
        return None