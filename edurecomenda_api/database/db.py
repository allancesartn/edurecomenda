import pymysql # type: ignore

class Database:
    _instance = None

    def __init__(self):
        self.connection = pymysql.connect(
            host='localhost',
            user='root',
            password='root',
            database='edurecomenda',
            cursorclass=pymysql.cursors.Cursor
        )

    @classmethod
    def get_instance(cls):
        if not cls._instance:
            cls._instance = Database()
        return cls._instance

    def get_connection(self):
        return self.connection
