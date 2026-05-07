import glob, re, os

files = glob.glob('src/components/compliance/*.tsx') + ['src/components/ceo/CEOComplianceContent.tsx']

color_map = {
    'bg-slate-900': 'bg-white',
    'bg-slate-800': 'bg-white',
    'bg-slate-700': 'bg-gray-50',
    'bg-slate-600': 'bg-gray-100',
    'bg-slate-500': 'bg-gray-200',
    'bg-slate-400': 'bg-gray-300',
    
    'text-slate-100': 'text-gray-900',
    'text-slate-200': 'text-gray-800',
    'text-slate-300': 'text-gray-700',
    'text-slate-400': 'text-gray-500',
    'text-slate-500': 'text-gray-600',
    'text-slate-600': 'text-gray-700',
    'text-slate-800': 'text-gray-900',
    
    'border-slate-800': 'border-gray-200',
    'border-slate-700': 'border-gray-200',
    'border-slate-600': 'border-gray-300',
    'border-slate-500': 'border-gray-300',
    'border-slate-400': 'border-gray-400',
    
    'hover:bg-slate-800': 'hover:bg-gray-50',
    'hover:bg-slate-700': 'hover:bg-gray-100',
    'hover:bg-slate-600': 'hover:bg-gray-200',
    
    'hover:text-slate-300': 'hover:text-gray-900',
    'hover:text-slate-200': 'hover:text-gray-900',
}

for f in files:
    with open(f, 'r') as file:
        content = file.read()
        
    new_content = content
    # Replace slate colors by descending length to avoid partial matches
    # Though these are discrete class names, so word boundaries might be better
    for k in sorted(color_map.keys(), key=len, reverse=True):
        new_content = re.sub(r'\b' + re.escape(k) + r'\b', color_map[k], new_content)
        
    # Also replace some specific text-white that should be dark
    new_content = new_content.replace('text-white tracking-tight', 'text-gray-900 tracking-tight')
    
    if new_content != content:
        with open(f, 'w') as file:
            file.write(new_content)
        print(f"Updated {f}")
