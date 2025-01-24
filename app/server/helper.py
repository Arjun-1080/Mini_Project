def stars_to_float(star_rating):
    star_map = {
        '★': 1.0,
        '★★': 2.0,
        '★★★': 3.0,
        '★★★★': 4.0,
        '★★★★★': 5.0,
        '½': 0.5,
        '★½': 1.5,
        '★★½': 2.5,
        '★★★½': 3.5,
        '★★★★½': 4.5
    }
    return star_map.get(star_rating, 0)

def trim_and_replace_spaces(text, replace_with='-'):
    text = text.strip()
    return text.replace(' ', replace_with)

__all__ = ['stars_to_float', 'trim_and_replace_spaces']