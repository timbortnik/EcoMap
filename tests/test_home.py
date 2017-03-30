from base_test import BaseTest
from pages.page_home import PageHome


class TestHome(BaseTest):
    def testHome(self):
        home = PageHome(self.driver)
        home.go_to()
        self.assertTrue(home.at())
