import glob
from lxml import etree, html

for path in glob.glob('**/*.html', recursive=True):
    print('processing', path)
    parser = html.HTMLParser(remove_comments=False)
    with open(path, 'r', encoding='utf-8') as f:
        tree = html.parse(f, parser)
    # pretty print
    content = etree.tostring(tree, method='html', pretty_print=True, encoding='unicode')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
