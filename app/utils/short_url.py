from werkzeug.routing import BaseConverter
import random
import string

SHORT_URL_REGEX = r"^([0-9a-zA-Z]{5})$"


def generate_short_url():
    return "".join(
        random.choice(string.digits + string.ascii_letters) for _ in range(5)
    )


class ShortUrlConverter(BaseConverter):
    def __init__(self, *args, **kwargs):
        super(ShortUrlConverter, self).__init__(*args, **kwargs)
        self.regex = SHORT_URL_REGEX
