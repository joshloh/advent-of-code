import sys
import re

def get_passports(array):
	passports = []
	# represent each passport as an array of  key value pairs
	passport = [] # [key:val, key:val]
	for line in array:
		# print('processing line:', line)
		if line == '\r\n': # blank line means new passport, add current passport to list, reset and then continue
			# print('resetting passport')
			if len(passport) > 0:
				passports.append(passport)
			passport = []
		else:
			# print('adding line to passport:')
			split = line.split(' ') # split kv pairs
			# print(split)
			for kv in split:
				passport.append(kv)
			# print('current passport:', passport)
	return passports

def validate_kv(key, value):
	if key == 'byr':
		return (int(value) >= 1920 and int(value) <=2002)
	elif key == 'iyr':
		return (int(value) >= 2010 and int(value) <=2020)
	elif key == 'eyr':
		return (int(value) >= 2020 and int(value) <=2030)
	elif key == 'hgt':
		height = re.compile(r'[0-9]{2,3}(cm|in)$')
		if (bool(height.match(value))):
			# we know the string is in the format (0)00in|cm
			cmin = value[len(value)-2:len(value)]
			num = int(value[0:len(value)-2])
			if cmin == 'cm':
				return num >= 150 and num <= 193
			elif cmin == 'in':
				return num >= 59 and num <= 76
		else:
			return False
	elif key == 'hcl':
		rgb = re.compile(r'#[a-f0-9]{6}$')
		return bool(rgb.match(value))
	elif key == 'ecl':
		return (value == 'amb' or value == 'blu' or value == 'brn' or value == 'gry' or value == 'grn' or value == 'hzl' or value == 'oth')
	elif key == 'pid':
		ninenum = re.compile(r'[0-9]{9}$')
		return bool(ninenum.match(value))
	elif key == 'cid':
		return True


def validate(passport):
	# extract keys and values
	keys = []
	values = []
	for kv in passport:
		keys.append(kv.split(':')[0])
		values.append(kv.split(':')[1].strip())
	# ensure necessary keys are there
	if (('byr' in keys) and ('iyr' in keys) and ('eyr' in keys) and ('hgt' in keys) and ('hcl' in keys) and ('ecl' in keys) and ('pid' in keys)):
		#validate all the values
		for i in range(len(keys)):
			if (not validate_kv(keys[i], values[i])):
				print(keys[i], values[i], "is invalid")
				return False
		return True
	else:
		return False

#main

lines = []
for line in sys.stdin:
	lines.append(line)

passports = get_passports(lines)

valid = 0
for passport in passports:
	if validate(passport):
		valid += 1

print('valid passport count:', valid)

# ---

# tests
# def test(k, v, expect):
# 	if (validate_kv(k,v) == expect):
# 		print('PASS')
# 	else:
# 		print('FAIL')

# test('byr', '2002', True)
# test('byr', '2003', False)

# test('hgt', '60in', True)
# test('hgt', '190cm', True)
# test('hgt', '190in', False)
# test('hgt', '190', False)

# test('hcl', '#123abc', True)
# test('hcl', '#123abz', False)
# test('hcl', '123abc', False)

# test('ecl', 'brn', True)
# test('ecl', 'wat', False)

# test('pid', '000000001', True)
# test('pid', '0123456789', False)
