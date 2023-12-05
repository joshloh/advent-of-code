import sys

def solve(array):
	array.append(0)
	array.sort()
	count1 = 0
	count3 = 1
	for i in range(len(array)-1):
		if array[i+1] - array[i] == 1:
			count1 += 1
		elif array[i+1] - array[i] == 3:
			count3 += 1
	return count1 * count3

lines = []
for line in sys.stdin:
	lines.append(int(line))

print(solve(lines))