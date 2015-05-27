# po-validator

A script to validate PO files.

## Installation

```
$ npm install
```

## Usage

```
$ node po-validate.js POFILE.po
```

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
