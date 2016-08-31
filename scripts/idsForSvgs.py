#!/usr/bin/env python
import xml.etree.ElementTree
import os
import json
import re
import sys

SCRIPT_DIR=os.path.dirname(os.path.realpath(sys.argv[0]))
SVG_DIR=SCRIPT_DIR+'/../assets/svg'
TARGET=SCRIPT_DIR+'/../assets/json/idsForSvgs.json'
f = []
for (dirpath, dirnames, filenames) in os.walk(SVG_DIR):
    f.extend(filenames)
    break

def idsInFile(filename):
	e = xml.etree.ElementTree.parse(SVG_DIR+'/'+filename).getroot()
	return sorted([x.attrib['id'] for x in e.findall(".//*[@id='LAYER_EFO']/*") if re.match('[A-Z]+_\w+', x.attrib['id'] )])

ids_for_svgs = {filename: idsInFile(filename) for filename in f}

with open(TARGET,'w') as target_file:
	json.dump(ids_for_svgs, target_file, indent=2)
