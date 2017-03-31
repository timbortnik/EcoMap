import unittest

from BaseStep import BaseStep
from BaseTest import BaseTest
from Steps import HomeSteps, SignInSteps


USER_EMAIL = "some test data"
USER_PW = "some test data"


class LoginTests(unittest.TestCase,
                 BaseTest, BaseStep):

    def __init__(self):
        BaseTest.__init__(self)
        self.home_steps = HomeSteps(self.driver)
        self.sign_in_steps = SignInSteps(self.driver)

    def test_sign_in_pos(self):
        self.home_steps.open()
        self.home_steps.click_sign_in()
        self.sign_in_steps.type_email(USER_EMAIL)
        self.sign_in_steps.type_password(USER_EMAIL)
        self.sign_in_steps.click_submit_btn()
        self.assertEqual("actual", "expected")   # ####

    def test_sign_in_empty_login(self):
        pass

    def test_sign_in_empty_pass(self):
        pass


class RegistrationTests(unittest.TestCase,
                        BaseTest, BaseStep):

    def __init__(self):
        BaseTest.__init__(self)

    def test_registration_pos(self):
        self.assertEqual("actual", "expected")
