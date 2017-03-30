import unittest
from selenium import webdriver
from ecoMapTests.Pages import *
import HtmlTestRunner
import os


class testLoginPage(unittest.TestCase):

    @classmethod
    def setUp(cls):
        cls.path = os.path.dirname(os.path.abspath(__file__))
        cls.driver = webdriver.Chrome(cls.path + "/chromedriver")

    def test_admin_logging(self):
        homepage = MainPage(self.driver)
        homepage.open_main_page()
        login_form = homepage.click_sign_button()
        login_form.login("admin@ecomap.com", "secre!")
        self.assertEqual(login_form.get_user(), 'ADMIN ADMIN')

    @classmethod
    def tearDown(cls):
        cls.driver.quit()


if __name__ == '__main__':
    unittest.main(testRunner=HtmlTestRunner.HTMLTestRunner(output=os.path.dirname(os.path.abspath(__file__))))