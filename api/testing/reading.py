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

image = "api/test_image.jpg"

image_buffer = sys.argv[1]


  ## Reads the image as an array of bytes.
image_data = tf.gfile.FastGFile(image_buffer, 'rb').read()

print(image_data)


def run_inference_on_image(image):
  """Runs inference on an image.

  Args:
    image: Image file name.

  Returns:
    Nothing
  """

  ## Reads the image as an array of bytes.
  image_data = tf.gfile.FastGFile(image, 'rb').read()


  with tf.Session() as sess:
    # Some useful tensors:
    # 'softmax:0': A tensor containing the normalized prediction across
    #   1000 labels.
    # 'pool_3:0': A tensor containing the next-to-last layer containing 2048
    #   float description of the image.
    # 'DecodeJpeg/contents:0': A tensor containing a string providing JPEG
    #   encoding of the image.
    # Runs the softmax tensor by feeding the image_data as input to the graph.
    softmax_tensor = sess.graph.get_tensor_by_name('softmax:0')
    predictions = sess.run(softmax_tensor,
                           {'DecodeJpeg/contents:0': image})
    predictions = np.squeeze(predictions)

    # Creates node ID --> English string lookup.
    node_lookup = NodeLookup()

    top_k = predictions.argsort()[-FLAGS.num_top_predictions:][::-1]

    for node_id in top_k:
      human_string = node_lookup.id_to_string(node_id)
      score = predictions[node_id]

      ## Data to send back to the server.
      print('%s (score = %.5f)' % (human_string, score))
