class PageBase(object):

    url = None

    def __init__(self, driver):
        self.driver = driver

    def go_to(self):
        self.driver.get(self.url)

    def at(self):
        return self.url in self.driver.current_url
