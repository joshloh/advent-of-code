import sys

def solve(array, right, down):
	col = 0
	width = len(array[0])
	trees = 0
	# print('width:', width)
	for row in range(int(len(array)/down)):
		# print(row*down)
		# print('col:',col)
		# print(row[col])
		if array[row*down][col] == '#':
			trees+=1
		col+=right
		col%=width
	return trees


lines = []
for line in sys.stdin:
	lines.append(line.strip())
a = solve(lines, 1, 1)
b = solve(lines, 3, 1)
c = solve(lines, 5, 1)
d = solve(lines, 7, 1)
e = solve(lines, 1, 2)

print(a,b,c,d,e)
print('trees:', a*b*c*d*e)
