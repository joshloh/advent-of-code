import sys

def check(i, preamble, array):
	for x in range(i-preamble, i):
		for y in range(i-preamble, i):
			if x is not y:
				if array[x] + array[y] == array[i]:
					return True
	return False

def solve(array, preamble):
	# from 25 to n
	for i in range(preamble, len(array)):
		if(not check(i, preamble, array)):
			return array[i]
	return 'err'


lines = []
for line in sys.stdin:
	lines.append(int(line))
print(solve(lines, 25))

