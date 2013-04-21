#!/usr/bin/env python
import sys
import re

def main(domain):
  input = open("/etc/hosts", 'r')
  current_file = input.read()
  if current_file.find("127.0.0.1 " + domain) > 0:
    #text = re.sub('\>', " >", text)
    # print "found"
    print domain + " now points to the INTERNET"
    new_file = current_file.replace("127.0.0.1 " + domain + "\n", "")
    output = open("/etc/hosts", "w")
    output.write(new_file)
  else:
    with open("/etc/hosts", "a") as myfile:
      myfile.write("127.0.0.1 " + domain + "\n")
      print domain + " now points to LOCALHOST"

if __name__ == "__main__":
    main(sys.argv[1])
