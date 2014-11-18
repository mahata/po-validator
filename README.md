# po-validator

A script to validate PO files.

## Prerequisites

* Node.js
    * npm install po2json
    * npm install lodash
    * npm install gettext-parser

## Usage

* node po-validate.js POFILE.po

## Example

When po-validator detects some errors:

```
$ node po-validate.js sample-data/wrong-ja.po 
Error:
 Hello, %s! 
 こんにちは、％s！ 


Validation Error Detected!
```

When po-validator doesn't detect any errors:

```
$ node po-validate.js sample-data/correct-ja.po 
No Validation Error Detected!
```
