#!/usr/bin/env python
import xml.etree.ElementTree
import os
import json
import re
import sys


SCRIPT_DIR=os.path.dirname(os.path.realpath(sys.argv[0]))
SVG_DIR=SCRIPT_DIR+'/../resources/svg'
TARGET=SCRIPT_DIR+'/../resources/json/idsForSvgs.json'
print("Regenerating the file %s"%TARGET)
svgsFound = []
for (dirpath, dirnames, filenames) in os.walk(SVG_DIR):
    for filename in filenames:
        if re.match(r".*\.svg", filename):
	    svgsFound.append((dirpath, filename))
    break
def idsInFile(filepath):
    print("Parsing: "+filepath)
    e = xml.etree.ElementTree.parse(filepath).getroot()
    return sorted([x.attrib['id'] for x in e.findall(".//*[@id='LAYER_EFO']/*") if re.match('[A-Z]+_\w+', x.attrib['id'] )])

ids_for_svgs = {filename: idsInFile(os.path.join(dirpath,filename)) for (dirpath,filename) in svgsFound}

with open(TARGET,'w') as target_file:
    json.dump(ids_for_svgs, target_file, indent=2)

print("Done!")
