import sys

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

def validate(passport):
	# extract key
	keys = []
	for kv in passport:
		keys.append(kv.split(':')[0])
	return (('byr' in keys) and ('iyr' in keys) and ('eyr' in keys) and ('hgt' in keys) and ('hcl' in keys) and ('ecl' in keys) and ('pid' in keys))

lines = []
for line in sys.stdin:
	lines.append(line)

passports = get_passports(lines)

valid = 0
for passport in passports:
	if validate(passport):
		valid += 1

print('valid passport count:', valid)
