import sys

def solve(array):
	col = 0
	width = len(array[0])
	trees = 0
	# print('width:', width)
	for row in array:
		# print(row)
		# print('col:',col)
		# print(row[col])
		if row[col] == '#':
			trees+=1
		col+=3
		col%=width
	return trees


lines = []
for line in sys.stdin:
	lines.append(line.strip())
print('trees:', solve(lines))

