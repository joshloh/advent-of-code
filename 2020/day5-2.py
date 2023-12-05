import sys

def binary_to_base10(one, binary):
	out = 0
	base = 1
	length = len(binary)
	for i in range(length):
		if(binary[length-1-i] == one):
			out = out + base
		base *= 2
	return out



def get_seat_id(boarding_pass):
	row = boarding_pass[0:7]
	col = boarding_pass[7:10]
	# print(row, col)
	# print(binary_to_base10('B', row))
	# print(binary_to_base10('R', col))
	return binary_to_base10('B', row)*8+binary_to_base10('R', col)

lines = []
for line in sys.stdin:
	lines.append(line)

seat_ids = []
for boarding_pass in lines:
	seat_id = get_seat_id(boarding_pass)
	seat_ids.append(seat_id)

missing = []
for i in range (947):
	if not(i in seat_ids):
		missing.append(i)

for x in missing:
	if x-1 in seat_ids and x+1 in seat_ids:
		print(x)


# tests
# def test(boarding_pass, expect):
# 	if get_boarding_id(boarding_pass) == expect:
# 		print('PASS')
# 	else:
# 		print('FAIL')

# test('BFFFBBFRRR', 567)
# test('FFFBBBFRRR', 119)
# test('BBFFBBFRLL', 820)
