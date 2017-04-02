from ecoMapTests.Pages import *
from ecoMapTests.BaseTest import BaseTest


class testLoginPage(BaseTest):

    def test_admin_logging(self):
        homepage = MainPage(self.driver)
        homepage.open_main_page()
        login_form = homepage.click_sign_button()
        login_form.login("admin@ecomap.com", "secre!")
        self.assertEqual(login_form.get_user(), 'ADMIN ADMIN')
        self.assertTrue(homepage.is_logo_present())
        self.assertEqual("http://localhost/#/map", homepage.get_url())
        self.assertEqual("Екологічні проблеми України", homepage.get_title())


