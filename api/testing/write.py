'''

ANYTHING THAT GETS "print" gets returned to the expres server. Just a word of caution for debugging.


'''

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import argparse
import os.path
import re
import sys
import tarfile
import sys


import numpy as np
from six.moves import urllib
import tensorflow as tf

from PIL import Image
from io import StringIO
import base64


image = "api/test_image.jpg"

image_buffer = sys.argv[1]


## Create an image file for the application. 
def create_image(img_data):
    
    ## Decode all of the new image data. 
    imgdata = base64.b64decode(img_data)

    ## Have a filename for the new image data. 
    filename = 'testing3.jpg'

    # Open and write the new file. 
    with open(filename, 'wb') as f:
         f.write(imgdata)



## Create the image first. 
create_image(image_buffer)






## A way to read and write an image file. 
# with open("api/testing/test_image.jpg", "rb") as image_file:
    
#     ## Encode the local image file. 
#     encoded_string = base64.b64encode(image_file.read())

#     ## Decode the image file as a string. 
#     imgdata = base64.b64decode(encoded_string)
    
#     ## Have a file name for the new string. 
#     filename = "testing2.jpg"
    
#     # Open and write the new file. 
#     with open(filename, 'wb') as f:
#         f.write(imgdata)

##    TODO - Delete the file. 
##    TODO - Tensorflow checking. 


