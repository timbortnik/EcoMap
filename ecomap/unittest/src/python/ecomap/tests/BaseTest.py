from selenium import webdriver


class BaseTest(object):
    def __init__(self):
        self.driver = webdriver.Chrome('')      ##########

    # @classmethod
    # def setUpClass(cls):
    #     cls.driver = webdriver.Chrome(executable_path')
    #
    # @classmethod
    # def tearDownClass(cls):
    #     if cls.driver != None:
    #         cls.driver.quit()

    @property
    def driver(self):
        return self.driver