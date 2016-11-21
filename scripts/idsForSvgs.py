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
regex = "\.DS_Store$"
for (dirpath, dirnames, filenames) in os.walk(SVG_DIR):
    for filename in filenames:
        if re.match(regex, filename):
		continue
	else: 
		svgsFound.append(os.path.join(dirpath, filename))
    break
def idsInFile(filename):
    print("Parsing: "+filename)
    e = xml.etree.ElementTree.parse(filename).getroot()
    return sorted([x.attrib['id'] for x in e.findall(".//*[@id='LAYER_EFO']/*") if re.match('[A-Z]+_\w+', x.attrib['id'] )])

ids_for_svgs = {filename: idsInFile(filename) for filename in svgsFound}

with open(TARGET,'w') as target_file:
    json.dump(ids_for_svgs, target_file, indent=2)

print("Done!")
