import sys

def tribonacci(x):
	tribon = [1,1,2,4]
	if x <= 3:
		return tribon[x]
	else:
		for i in range(3, x):
			tribon.append(tribon[i]+tribon[i-1]+tribon[i-2])
	return tribon[x]

def count_consec_ones(array):
	out = []
	consec = 0
	for item in array:
		if item == 1:
			consec+=1
		else:
			out.append(consec)
			consec = 0
	return out

def solve(array):
	array.append(0)
	array.append(max(array)+3)
	array.sort()
	diffs = []
	for i in range(len(array)-1):
		diffs.append(array[i+1] - array[i])
	print(diffs)
	consec = count_consec_ones(diffs)
	print(consec)
	total = 1
	for item in consec:
		total *= tribonacci(item)
	return total

lines = []
for line in sys.stdin:
	lines.append(int(line))

print(solve(lines))
