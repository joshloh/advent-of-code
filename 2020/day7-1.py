import sys

def parse(line):
	parsed = line.split('contain')
	arr = parsed[0].split(' ')
	container = arr[0]+arr[1]
	contained_intermediate = parsed[1].split(',')
	contained = []
	for item in contained_intermediate:
		arr = item.split(' ')
		contained.append(arr[2] + arr[3].strip())
	return [container, contained]

def find(arr1, arr2):
	#return true if ANY of the items in arr1 are in arr2
	for i1 in arr1:
		for i2 in arr2:
			if i1 == i2:
				return True
	return False


def solve(array):
	parsed = []
	for line in array:
		parsed.append(parse(line))
	# parsed = [container, [contained1, contained2]]
	# for item in parsed:
	# 	print(item)
	lookingfor = ['shinygold']
	count = 0
	while (True):
		found = False
		for item in parsed:
			container = item[0]
			contained = item[1]
			if find(lookingfor, contained):
				lookingfor.append(container)
				parsed.remove(item)
				count += 1
				found = True
		if not found:
			break
	return count





lines = []
for line in sys.stdin:
	lines.append(line)
print(solve(lines))

