import glob
import re
import os
print('reindent_html starting, cwd=', os.getcwd())

for path in glob.glob('**/*.html', recursive=True):
    print('found', path)
    # skip partials
    if path.startswith('partials' + os.sep):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    new_lines = []
    for line in lines:
        # count leading spaces
        match = re.match(r"^( +)", line)
        if match:
            count = len(match.group(1))
            new_indent = ' ' * (count * 4)
            new_lines.append(new_indent + line[len(match.group(1)):])
        else:
            new_lines.append(line)
    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print('reindented', path)
