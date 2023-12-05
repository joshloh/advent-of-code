import sys

def parse(array):
	ops = []
	args = []
	for item in array:
		token = item.split(' ')
		ops.append(token[0])
		args.append(token[1])
	return [ops, args]


def check_loop(ops, args):
	x = len(ops)
	executed = set()
	acc = 0
	i = 0
	looped = False
	while (i < x):
		if i in executed:
			looped = True
			break
		op = ops[i]
		arg = int(args[i])
		# print('op:', op, 'arg:', arg)
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
	return looped

def get_acc(ops, args):
	x = len(ops)
	executed = set()
	acc = 0
	i = 0
	while (i < x):
		if i in executed:
			break
		op = ops[i]
		arg = int(args[i])
		# print('op:', op, 'arg:', arg)
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
	return acc

def solve(ops, args):
	# keep changing nop to jmp until no loop?
	for i in range(len(ops)):
		if (ops[i] == 'nop' or ops[i] == 'jmp'):
			# print('changing step', i, 'from', ops[i])
			ops_copy = ops.copy()
			if (ops_copy[i] == 'nop'):
				ops_copy[i] = 'jmp'
			else:
				ops_copy[i] = 'nop'
			if(not check_loop(ops_copy, args)):
				return get_acc(ops_copy, args)


lines = []
for line in sys.stdin:
	lines.append(line)
ops_args = parse(lines)
print(solve(ops_args[0], ops_args[1]))
