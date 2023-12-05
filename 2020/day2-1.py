import sys

def solve(array):
	valid = 0
	# tokenise the line
	for line in array: 
		tokens = line.split(' ')
		limits = tokens[0].split('-')
		lower = int(limits[0])
		upper = int(limits[1])
		letter = tokens[1].split(':')[0]
		password = tokens[2]
		# print('lower:', lower, 'upper:', upper, 'letter:', letter, 'password:', password)
		count = 0
		for target in password:
			if target == letter:
				count+=1
		if count <= upper and count >= lower:
			valid+=1
	return valid

lines = []
for line in sys.stdin:
	lines.append(line)
print(solve(lines))

