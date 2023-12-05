import sys

def solve(array):
	valid = 0
	# tokenise the line
	for line in array: 
		tokens = line.split(' ')
		indexes = tokens[0].split('-')
		i1 = int(indexes[0])-1
		i2 = int(indexes[1])-1
		letter = tokens[1].split(':')[0]
		password = tokens[2]
		# print('lower:', lower, 'upper:', upper, 'letter:', letter, 'password:', password)
		if (password[i1] == letter) ^ (password[i2] == letter):
			valid+=1
			print("VALID", password)
	return valid

lines = []
for line in sys.stdin:
	lines.append(line)
print(solve(lines))

