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
<<<<<<< HEAD
print("I will look through the directory "+SVG_DIR)
f = []
=======
svgsFound = []
>>>>>>> c545027c6dc982efd6c444ead373b17d8422a6f4
for (dirpath, dirnames, filenames) in os.walk(SVG_DIR):
    for filename in filenames:
        if re.match(r".*\.svg", filename):
	    svgsFound.append((dirpath, filename))
    break
<<<<<<< HEAD

def idsInFile(filename):
    print("Trying to parse file "+str(filename))
    e = xml.etree.ElementTree.parse(SVG_DIR+'/'+filename).getroot()
=======
def idsInFile(filepath):
    print("Parsing: "+filepath)
    e = xml.etree.ElementTree.parse(filepath).getroot()
>>>>>>> c545027c6dc982efd6c444ead373b17d8422a6f4
    return sorted([x.attrib['id'] for x in e.findall(".//*[@id='LAYER_EFO']/*") if re.match('[A-Z]+_\w+', x.attrib['id'] )])

ids_for_svgs = {filename: idsInFile(os.path.join(dirpath,filename)) for (dirpath,filename) in svgsFound}

with open(TARGET,'w') as target_file:
    json.dump(ids_for_svgs, target_file, indent=2)

print("Done!")
