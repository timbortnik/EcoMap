from unittest import TestCase
from selenium import webdriver


class BaseTest(TestCase):

    driver = None

    def setUp(self):
        self.driver = webdriver.Chrome()

    def tearDown(self):
        self.driver.close()

