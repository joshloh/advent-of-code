import sys

def check(i, preamble, array):
	for x in range(i-preamble, i):
		for y in range(i-preamble, i):
			if x is not y:
				if array[x] + array[y] == array[i]:
					return True
	return False

def find_invalid(array, preamble):
	# from 25 to n
	for i in range(preamble, len(array)):
		if(not check(i, preamble, array)):
			return array[i]
	return 'err'

def weakness(array, inv):
	for i in range(len(array)): # 0 -> end of array - 1
		for j in range(i+2, len(array)+1): # i -> end of array
			subarr = array[i:j]
			# print(i,j, subarr, sum(subarr))
			cum = sum(subarr)
			if cum == inv:
				# print('FOUND', subarr)
				return min(subarr) + max(subarr)
			elif cum > inv:
				break

lines = []
for line in sys.stdin:
	lines.append(int(line))
inv = find_invalid(lines, 25)
print(inv)
print(weakness(lines, inv))