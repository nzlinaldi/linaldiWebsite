import glob
from bs4 import BeautifulSoup

for path in glob.glob('**/*.html', recursive=True):
    print('processing', path)
    with open(path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
    pretty = soup.prettify()
    with open(path, 'w', encoding='utf-8') as f:
        f.write(pretty)
