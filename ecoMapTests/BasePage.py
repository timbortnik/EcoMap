from ecoMapTests.Pages import *

class BasePage(object):

    def __init__(self, driver):
        self.driver = driver
        driver.implicitly_wait(30)
        driver.maximize_window()

    def open_main_page(self):
        self.url = "http://localhost/#/map"
        self.driver.get(self.url)

    def get_title(self):
        return self.driver.title

    def get_url(self):
        return self.driver.current_url

    def open_statistic(self):
        #return statistics page
        pass

    def open_resources(self):
        #return resources page
        pass

    #def increase(self):
        #increase map
       # pass

    #def decrease(self):
        #decrease map
       # pass

   # def view(self):
        #open viewing of place
       # pass

    def get_logo(self):
        #return true if logo is present
        pass

    def isElementPresent(self):
        # return true of element is present
        pass