import sys

def solve(array):
	ops = []
	args = []
	for item in array:
		token = item.split(' ')
		ops.append(token[0])
		args.append(token[1])

	x = len(ops)
	executed = set()
	acc = 0
	i = 0
	while (i < x):
		print(i)
		if i in executed:
			break
		op = ops[i]
		arg = int(args[i])
		print('op:', op, 'arg:', arg)
		# execute the op
		if op == 'nop':
			executed.add(i)
			i+=1
			continue
		elif op == 'acc':
			executed.add(i)
			acc += arg
			i+=1
			continue
		elif op == 'jmp':
			executed.add(i)
			i += arg
			continue
	print('acc:', acc)


lines = []
for line in sys.stdin:
	lines.append(line)
solve(lines)
