import sys

def parse(line):
	parsed = line.split('contain')
	arr = parsed[0].split(' ')
	container = arr[0]+arr[1]
	contained_intermediate = parsed[1].split(',')
	contained = []
	for item in contained_intermediate:
		fuck = []
		arr = item.split(' ')
		fuck.append(arr[2] + arr[3].strip())
		if arr[1] != 'no':
			fuck.append(int(arr[1]))
		else:
			fuck.append(0)
		contained.append(fuck)
	return [container, contained]

def find(arr1, arr2):
	#return true if ANY of the items in arr1 are in arr2
	for i1 in arr1:
		for i2 in arr2:
			if i1 == i2:
				return True
	return False

def count_bags(lookingfor, parsed, containers, count):
	count = 0
	found = containers.index(lookingfor)
	bags_inside = parsed[found][1]
	if bags_inside[0][1] == 0:
		return 0
	for item in bags_inside:
		count+= item[1]+(item[1]*count_bags(item[0], parsed, containers, count))
	print('looking for:', lookingfor)
	print('needed: ', count)
	return count


def solve(array):
	parsed = []
	containers = []
	# parsed = [container, [[contained1, count], [contained2, count]]]
	x = 0
	for line in array:
		parsed.append(parse(line))
		containers.append(parsed[x][0])
		x += 1
		# print(parse(line))
	return count_bags('shinygold', parsed, containers, 1)


lines = []
for line in sys.stdin:
	lines.append(line)
print(solve(lines))

