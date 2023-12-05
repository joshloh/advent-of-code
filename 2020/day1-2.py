import sys

def calculate(array):
	l = len(array)
	for x in range(l-2):
		for y in range(x+1,l-1):
			for z in range(y+1,l):
				if (array[x]+array[y]+array[z]==2020):
					return array[x]*array[y]*array[z]

numbers = []
for line in sys.stdin:
	numbers.append(int(line))
print(calculate(numbers))

