from pages import Pages

class PageFactory(object):
    def get_page_object(self, driver, page_name, page_url):
        page_name = page_name.lower()
        if page_name == "main":
            return Pages.MainPage(driver, page_url)
        elif page_name == "login":
            return Pages.LoginPage(driver, page_url)
