
"""Simple image classification with Inception.

Run image classification with Inception trained on ImageNet 2012 Challenge data
set.

This program creates a graph from a saved GraphDef protocol buffer,
and runs inference on an input JPEG image. It outputs human readable
strings of the top 5 predictions along with their probabilities.

Change the --image_file argument to any jpg image to compute a
classification of that image.

Please see the tutorial and website for a detailed description of how
to use this script to perform image recognition.

https://tensorflow.org/tutorials/image_recognition/
"""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import argparse
import os.path
import re
import sys
import tarfile
import sys
import base64

import numpy as np
from six.moves import urllib
import tensorflow as tf


from PIL import Image
from io import StringIO


## Image buffer sent to the file. 
image_buffer = sys.argv[1]

image_name = sys.argv[2]

## Create an image file for the application. 
def create_image(img_data):
    
    ## Decode all of the new image data. 
    imgdata = base64.b64decode(img_data)

    # Open and write the new file. 
    with open(image_name, 'wb') as f:
         f.write(imgdata)


create_image(image_buffer)



