1. Tại sao cần ma trận 2x2?
Trong bài toán này, chúng ta có:
Một điểm đích (Prize) với tọa độ (prizeX, prizeY)
Hai nút bấm A và B, mỗi nút khi bấm sẽ di chuyển theo vector:
Nút A: (buttonAX, buttonAY)
Nút B: (buttonBX, buttonBY)
Khi bấm nút A số lần là x và nút B số lần là y, ta có hệ phương trình:
buttonAX * x + buttonBX * y = prizeX
buttonAY * x + buttonBY * y = prizeY
Đây là hệ phương trình tuyến tính 2 ẩn, có thể biểu diễn dưới dạng ma trận:
[buttonAX  buttonBX] [x] = [prizeX]
[buttonAY  buttonBY] [y]   [prizeY]
2. Tại sao phải % cho det?
det (định thức) = buttonAX buttonBY - buttonBX buttonAY
Khi giải hệ phương trình bằng quy tắc Cramer, ta cần:
  x = (buttonBY * prizeX - buttonBX * prizeY) / det
  y = (-buttonAY * prizeX + buttonAX * prizeY) / det
Phép chia dư % det được dùng để kiểm tra xem nghiệm có phải là số nguyên không
Nếu chia dư khác 0, nghĩa là nghiệm không phải số nguyên, ta bỏ qua trường hợp này vì:
1. Không thể bấm nút một số lần không nguyên
Chỉ các nghiệm nguyên mới là hợp lệ trong bài toán này
Ví dụ:
Nếu (buttonBY prizeX - buttonBX prizeY) = 15 và det = 4
Thì x = 15/4 = 3.75 (không hợp lệ vì không thể bấm nút 3.75 lần)
Code sẽ kiểm tra 15 % 4 = 3 ≠ 0 và bỏ qua trường hợp này
Đây là cách để đảm bảo chỉ tìm ra các nghiệm nguyên dương, phù hợp với yêu cầu thực tế của bài toán.


Để tìm x và y, quy tắc Cramer cho chúng ta:
Tính x:
x = D1/D
Trong đó:
D = det = buttonAX buttonBY - buttonBX buttonAY
D1 = định thức của ma trận khi thay cột x bằng vector kết quả:
  [prizeX  buttonBX]
  [prizeY  buttonBY]
  D1 = prizeX buttonBY - buttonBX prizeY
Tính y:
y = D2/D
Trong đó:
D2 = định thức của ma trận khi thay cột y bằng vector kết quả:
  [buttonAX  prizeX]
  [buttonAY  prizeY]
D2 = buttonAX prizeY - buttonAY prizeX

vậy:
x = (buttonBY * prizeX - buttonBX * prizeY) / det
y = (-buttonAY * prizeX + buttonAX * prizeY) / det


