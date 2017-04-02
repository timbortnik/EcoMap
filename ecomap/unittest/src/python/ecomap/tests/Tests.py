import unittest

from BaseStep import BaseStep
from BaseTest import BaseTest
from Steps import HomeSteps, SignInSteps


USER_EMAIL = "admin@ecomap.com"
USER_PW = "secre!"
USER_NAME = "ADMIN ADMIN"


class LoginTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        BaseTest.__init__(cls)
        cls.home_steps = HomeSteps(cls.driver)
        cls.sign_in_steps = SignInSteps(cls.driver)

    def test_sign_in_pos(self):
        self.home_steps.open()
        self.home_steps.click_sign_in()
        self.sign_in_steps.type_email(USER_EMAIL)
        self.sign_in_steps.type_password(USER_PW)
        self.sign_in_steps.click_submit_btn()
        self.assertEqual(self.home_steps.get_user_name(), USER_NAME)

    def test_sign_in_empty_login(self):
        pass

    def test_sign_in_empty_pass(self):
        pass

    @classmethod
    def tearDownClass(cls):
        if cls.driver != None:
            cls.driver.quit()
