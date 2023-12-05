import sys

def get_groups(array):
	groups = []
	# represent each group as an array of answers
	answer = [] 
	for line in array:
		if line == '\r\n':
			if len(answer) > 0:
				groups.append(answer)
			answer = []
		else:
			answer.append(line.strip())
	return groups

def score_group(array):
	countset = set()
	for person in array:
		for ch in person:
			countset.add(ch)
	return len(countset)


#main
lines = []
for line in sys.stdin:
	lines.append(line)
# print(get_groups(lines))
groups = get_groups(lines)
score = 0
for group in groups:
	# print(score_group(group))
	score += score_group(group)

print(score)

