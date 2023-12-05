import sys

def calculate(array):
	l = len(array)
	for x in range(l-1):
		for y in range(x+1, l):
			if (array[x]+array[y]==2020):
				return array[x]*array[y]

numbers = []
for line in sys.stdin:
	numbers.append(int(line))
print(calculate(numbers))

