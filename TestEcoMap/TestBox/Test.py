import unittest
from pages.PageFactory import PageFactory
from pages.DriverFacory import DriverFactory
from pages.Creadentials import ADMIN


class Test(unittest.TestCase):
    driver = None
    @classmethod
    def setUpClass(cls):
        cls.page_factory = PageFactory()
        cls.driver = DriverFactory().get_driver("chrome")
        cls.driver.implicitly_wait(10)
        cls.driver.maximize_window()

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

from pages.PagesURL import PagesURL

class MainPageTest(Test):
    def test_open_main_page(self):
        main_page = self.page_factory.get_page_object(self.driver, "main", PagesURL.MAIN)
        main_page.open()
        main_page.click_login()
        login_page = self.page_factory.get_page_object(self.driver, "login", PagesURL.LOGIN)
        login_page.enter_credentials(ADMIN.LOGIN, ADMIN.LOGIN)


if __name__== '__main__':
     unittest.main()