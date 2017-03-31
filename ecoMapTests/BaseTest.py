import unittest
from selenium import webdriver
import HtmlTestRunner
import os

class BaseTest(unittest.TestCase):

    @classmethod
    def setUp(cls):
        cls.path = os.path.dirname(os.path.abspath(__file__))
        cls.driver = webdriver.Chrome(cls.path + "/chromedriver")\

    @classmethod
    def tearDown(cls):
        cls.driver.quit()


if __name__ == '__main__':
    unittest.main(testRunner=HtmlTestRunner.HTMLTestRunner(output=os.path.dirname(os.path.abspath(__file__))))