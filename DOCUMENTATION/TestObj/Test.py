import unittest
import os
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from HtmlTestRunner import HTMLTestRunner as HR

from DOCUMENTATION.TestObj import BasePage
from DOCUMENTATION.TestObj.BasePage import MainPage



class Test(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        HOST = os.environ.get('EcoMap_Host', 'http://localhost')
        chrome_driver_path = "/home/nata/pythonhw/Selenium/chromedriver"
        cls.driver = webdriver.Chrome(chrome_driver_path)
        cls.driver.implicitly_wait(30)
        cls.driver.maximize_window()
        cls.driver.get(HOST)
        cls.main_page = MainPage(cls.driver)


    def test_page_load(self):
        self.main_page.checkPageLoaded()

    def test_find_map(self):
        self.main_page.find_button()

    def test_login_page(self):
        self.main_page.check_login_page()


    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()


if __name__ == "__main__":
        unittest.main(verbosity=2)