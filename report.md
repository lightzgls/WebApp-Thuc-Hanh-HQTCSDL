# Hệ Quản Trị Cơ Sở Dữ Liệu – Bài Tập Thực Hành 2

**Mã số sinh viên:** _[Mã SV]_  
**Họ và tên:** _[Họ tên]_  
**Ngày nộp:** Tháng 3, 2026

---

## Mục Lục

1. [Cài đặt SQL Server và tạo cơ sở dữ liệu](#1-cài-đặt-sql-server-và-tạo-cơ-sở-dữ-liệu)
2. [Các câu truy vấn SQL (Phần 2A)](#2a-các-câu-truy-vấn-sql)
3. [Tối ưu hóa truy vấn (Phần 2B)](#2b-tối-ưu-hóa-truy-vấn)
4. [Phát triển ứng dụng cơ sở dữ liệu](#3-phát-triển-ứng-dụng-cơ-sở-dữ-liệu)

---

## 1. Cài Đặt SQL Server và Tạo Cơ Sở Dữ Liệu

### 1.1 Môi trường cài đặt

- **Hệ quản trị CSDL:** Microsoft SQL Server Express 2022
- **Công cụ quản lý:** SQL Server Management Studio (SSMS) v19
- **Hệ điều hành:** Windows 10/11

> _[Chèn ảnh chụp màn hình: Kết nối SQL Server trong SSMS]_

### 1.2 Lược đồ cơ sở dữ liệu

Cơ sở dữ liệu quản lý **sản xuất máy tính** gồm 4 bảng:

- **Manufacturer** – Lưu thông tin nhà sản xuất
- **Product** – Liên kết nhà sản xuất với sản phẩm
- **PC** – Thông tin chi tiết máy tính để bàn
- **Laptop** – Thông tin chi tiết máy tính xách tay

#### Lược đồ quan hệ

```
Manufacturer (MaNSX, TenNSX, DiaChi)
Product      (MaNSX, MaSP, loai)
PC           (MaSP_P, CPU, RAM, HD, price)
Laptop       (MaSP_L, CPU, RAM, HD, Screen, price)
```

### 1.3 Câu lệnh tạo bảng

```sql
CREATE DATABASE ComputerManufacturing;
GO
USE ComputerManufacturing;
GO

-- Bảng Nhà sản xuất
CREATE TABLE Manufacturer (
    MaNSX VARCHAR(20) PRIMARY KEY,
    TenNSX NVARCHAR(100) NOT NULL,
    DiaChi NVARCHAR(200)
);

-- Bảng Sản phẩm
CREATE TABLE Product (
    MaSP VARCHAR(20) PRIMARY KEY,
    MaNSX VARCHAR(20) NOT NULL,
    loai VARCHAR(10) CHECK (loai IN ('PC', 'Laptop')),
    FOREIGN KEY (MaNSX) REFERENCES Manufacturer(MaNSX)
);

-- Bảng PC
CREATE TABLE PC (
    MaSP_P VARCHAR(20) PRIMARY KEY,
    CPU FLOAT,
    RAM INT,
    HD INT,
    price DECIMAL(18,2),
    FOREIGN KEY (MaSP_P) REFERENCES Product(MaSP)
);

-- Bảng Laptop
CREATE TABLE Laptop (
    MaSP_L VARCHAR(20) PRIMARY KEY,
    CPU FLOAT,
    RAM INT,
    HD INT,
    Screen FLOAT,
    price DECIMAL(18,2),
    FOREIGN KEY (MaSP_L) REFERENCES Product(MaSP)
);
```

> _[Chèn ảnh chụp màn hình: Kết quả tạo bảng]_

### 1.4 Dữ liệu mẫu

#### Bảng Manufacturer (Nhà sản xuất)

```sql
INSERT INTO Manufacturer VALUES ('NSX01', N'Dell', N'Texas, USA');
INSERT INTO Manufacturer VALUES ('NSX02', N'HP', N'California, USA');
INSERT INTO Manufacturer VALUES ('NSX03', N'Lenovo', N'Beijing, China');
INSERT INTO Manufacturer VALUES ('NSX04', N'Asus', N'Taipei, Taiwan');
INSERT INTO Manufacturer VALUES ('NSX05', N'Acer', N'Hsinchu, Taiwan');
INSERT INTO Manufacturer VALUES ('NSX06', N'Apple', N'California, USA');
INSERT INTO Manufacturer VALUES ('NSX07', N'MSI', N'Taipei, Taiwan');
INSERT INTO Manufacturer VALUES ('NSX08', N'Gigabyte', N'Taipei, Taiwan');
INSERT INTO Manufacturer VALUES ('NSX09', N'Samsung', N'Seoul, Korea');
INSERT INTO Manufacturer VALUES ('NSX10', N'Toshiba', N'Tokyo, Japan');
```

| MaNSX | TenNSX | DiaChi |
|-------|--------|--------|
| NSX01 | Dell | Texas, USA |
| NSX02 | HP | California, USA |
| NSX03 | Lenovo | Beijing, China |
| NSX04 | Asus | Taipei, Taiwan |
| NSX05 | Acer | Hsinchu, Taiwan |
| NSX06 | Apple | California, USA |
| NSX07 | MSI | Taipei, Taiwan |
| NSX08 | Gigabyte | Taipei, Taiwan |
| NSX09 | Samsung | Seoul, Korea |
| NSX10 | Toshiba | Tokyo, Japan |

> _[Chèn ảnh chụp màn hình: SELECT * FROM Manufacturer]_

#### Bảng Product (Sản phẩm)

```sql
INSERT INTO Product VALUES ('SP01', 'NSX01', 'PC');
INSERT INTO Product VALUES ('SP02', 'NSX01', 'PC');
INSERT INTO Product VALUES ('SP03', 'NSX02', 'PC');
INSERT INTO Product VALUES ('SP04', 'NSX03', 'PC');
INSERT INTO Product VALUES ('SP05', 'NSX04', 'PC');
INSERT INTO Product VALUES ('SP06', 'NSX01', 'Laptop');
INSERT INTO Product VALUES ('SP07', 'NSX02', 'Laptop');
INSERT INTO Product VALUES ('SP08', 'NSX03', 'Laptop');
INSERT INTO Product VALUES ('SP09', 'NSX03', 'Laptop');
INSERT INTO Product VALUES ('SP10', 'NSX04', 'Laptop');
INSERT INTO Product VALUES ('SP11', 'NSX05', 'PC');
INSERT INTO Product VALUES ('SP12', 'NSX05', 'PC');
INSERT INTO Product VALUES ('SP13', 'NSX06', 'Laptop');
INSERT INTO Product VALUES ('SP14', 'NSX06', 'PC');
INSERT INTO Product VALUES ('SP15', 'NSX07', 'Laptop');
INSERT INTO Product VALUES ('SP16', 'NSX07', 'PC');
INSERT INTO Product VALUES ('SP17', 'NSX08', 'PC');
INSERT INTO Product VALUES ('SP18', 'NSX08', 'PC');
INSERT INTO Product VALUES ('SP19', 'NSX09', 'PC');
INSERT INTO Product VALUES ('SP20', 'NSX09', 'PC');
INSERT INTO Product VALUES ('SP21', 'NSX10', 'Laptop');
INSERT INTO Product VALUES ('SP22', 'NSX10', 'Laptop');
INSERT INTO Product VALUES ('SP23', 'NSX01', 'PC');
INSERT INTO Product VALUES ('SP24', 'NSX02', 'Laptop');
INSERT INTO Product VALUES ('SP25', 'NSX03', 'PC');
```

| MaSP | MaNSX | loai |
|------|-------|------|
| SP01 | NSX01 | PC |
| SP02 | NSX01 | PC |
| SP03 | NSX02 | PC |
| SP04 | NSX03 | PC |
| SP05 | NSX04 | PC |
| SP06 | NSX01 | Laptop |
| SP07 | NSX02 | Laptop |
| SP08 | NSX03 | Laptop |
| SP09 | NSX03 | Laptop |
| SP10 | NSX04 | Laptop |
| SP11 | NSX05 | PC |
| SP12 | NSX05 | PC |
| SP13 | NSX06 | Laptop |
| SP14 | NSX06 | PC |
| SP15 | NSX07 | Laptop |
| SP16 | NSX07 | PC |
| SP17 | NSX08 | PC |
| SP18 | NSX08 | PC |
| SP19 | NSX09 | PC |
| SP20 | NSX09 | PC |
| SP21 | NSX10 | Laptop |
| SP22 | NSX10 | Laptop |
| SP23 | NSX01 | PC |
| SP24 | NSX02 | Laptop |
| SP25 | NSX03 | PC |

> _[Chèn ảnh chụp màn hình: SELECT * FROM Product]_

#### Bảng PC

```sql
INSERT INTO PC VALUES ('SP01', 3.2, 16, 512, 800.00);
INSERT INTO PC VALUES ('SP02', 2.8, 8, 256, 600.00);
INSERT INTO PC VALUES ('SP03', 3.0, 16, 512, 750.00);
INSERT INTO PC VALUES ('SP04', 3.2, 32, 1024, 1200.00);
INSERT INTO PC VALUES ('SP05', 2.5, 8, 256, 500.00);
INSERT INTO PC VALUES ('SP11', 2.8, 16, 512, 650.00);
INSERT INTO PC VALUES ('SP12', 3.0, 8, 256, 550.00);
INSERT INTO PC VALUES ('SP14', 3.2, 32, 1024, 2000.00);
INSERT INTO PC VALUES ('SP16', 3.5, 16, 512, 1200.00);
INSERT INTO PC VALUES ('SP17', 2.8, 8, 256, 600.00);
INSERT INTO PC VALUES ('SP18', 3.0, 16, 512, 850.00);
INSERT INTO PC VALUES ('SP19', 2.5, 8, 256, 500.00);
INSERT INTO PC VALUES ('SP20', 2.8, 16, 512, 700.00);
INSERT INTO PC VALUES ('SP23', 3.5, 16, 512, 900.00);
INSERT INTO PC VALUES ('SP25', 3.0, 32, 1024, 1100.00);
```

| MaSP_P | CPU | RAM | HD | price |
|--------|-----|-----|----|-------|
| SP01 | 3.2 | 16 | 512 | 800.00 |
| SP02 | 2.8 | 8 | 256 | 600.00 |
| SP03 | 3.0 | 16 | 512 | 750.00 |
| SP04 | 3.2 | 32 | 1024 | 1200.00 |
| SP05 | 2.5 | 8 | 256 | 500.00 |
| SP11 | 2.8 | 16 | 512 | 650.00 |
| SP12 | 3.0 | 8 | 256 | 550.00 |
| SP14 | 3.2 | 32 | 1024 | 2000.00 |
| SP16 | 3.5 | 16 | 512 | 1200.00 |
| SP17 | 2.8 | 8 | 256 | 600.00 |
| SP18 | 3.0 | 16 | 512 | 850.00 |
| SP19 | 2.5 | 8 | 256 | 500.00 |
| SP20 | 2.8 | 16 | 512 | 700.00 |
| SP23 | 3.5 | 16 | 512 | 900.00 |
| SP25 | 3.0 | 32 | 1024 | 1100.00 |

> _[Chèn ảnh chụp màn hình: SELECT * FROM PC]_

#### Bảng Laptop

```sql
INSERT INTO Laptop VALUES ('SP06', 2.8, 16, 512, 15.6, 1200.00);
INSERT INTO Laptop VALUES ('SP07', 3.0, 16, 256, 14.0, 1100.00);
INSERT INTO Laptop VALUES ('SP08', 3.2, 32, 1024, 15.6, 1800.00);
INSERT INTO Laptop VALUES ('SP09', 2.5, 8, 256, 13.3, 900.00);
INSERT INTO Laptop VALUES ('SP10', 2.5, 16, 512, 14.0, 1050.00);
INSERT INTO Laptop VALUES ('SP13', 3.2, 16, 512, 14.2, 2500.00);
INSERT INTO Laptop VALUES ('SP15', 3.5, 16, 1024, 15.6, 1600.00);
INSERT INTO Laptop VALUES ('SP21', 2.5, 8, 256, 13.3, 800.00);
INSERT INTO Laptop VALUES ('SP22', 2.8, 16, 512, 14.0, 1000.00);
INSERT INTO Laptop VALUES ('SP24', 2.8, 16, 512, 15.6, 1150.00);
```

| MaSP_L | CPU | RAM | HD | Screen | price |
|--------|-----|-----|----|--------|-------|
| SP06 | 2.8 | 16 | 512 | 15.6 | 1200.00 |
| SP07 | 3.0 | 16 | 256 | 14.0 | 1100.00 |
| SP08 | 3.2 | 32 | 1024 | 15.6 | 1800.00 |
| SP09 | 2.5 | 8 | 256 | 13.3 | 900.00 |
| SP10 | 2.5 | 16 | 512 | 14.0 | 1050.00 |
| SP13 | 3.2 | 16 | 512 | 14.2 | 2500.00 |
| SP15 | 3.5 | 16 | 1024 | 15.6 | 1600.00 |
| SP21 | 2.5 | 8 | 256 | 13.3 | 800.00 |
| SP22 | 2.8 | 16 | 512 | 14.0 | 1000.00 |
| SP24 | 2.8 | 16 | 512 | 15.6 | 1150.00 |

> _[Chèn ảnh chụp màn hình: SELECT * FROM Laptop]_

---

## 2A. Các Câu Truy Vấn SQL

### Câu 1: Tìm tên các nhà sản xuất chỉ sản xuất PC mà không sản xuất Laptop

**Câu truy vấn:**

```sql
SELECT DISTINCT m.TenNSX
FROM Manufacturer m
JOIN Product p ON m.MaNSX = p.MaNSX
WHERE p.loai = 'PC'
  AND m.MaNSX NOT IN (
      SELECT MaNSX FROM Product WHERE loai = 'Laptop'
  );
```

**Giải thích:**
- Kết nối bảng `Manufacturer` với `Product` để lấy tên nhà sản xuất.
- Điều kiện `WHERE p.loai = 'PC'` đảm bảo chỉ xét những nhà sản xuất có sản phẩm PC.
- Truy vấn con `NOT IN` loại bỏ các nhà sản xuất có xuất hiện trong bảng `Product` với `loai = 'Laptop'`.
- `DISTINCT` tránh trùng lặp khi một nhà sản xuất có nhiều sản phẩm PC.

**Kết quả:**

| TenNSX |
|--------|
| Acer |
| Gigabyte |
| Samsung |

Acer (NSX05), Gigabyte (NSX08) và Samsung (NSX09) chỉ có sản phẩm PC và không có sản phẩm Laptop nào.

> _[Chèn ảnh chụp màn hình: Kết quả câu 1 trong SSMS]_

---

### Câu 2: Tăng giá tất cả PC do Dell sản xuất thêm 10%

**Câu truy vấn:**

```sql
-- Trước khi cập nhật
SELECT PC.* FROM PC
JOIN Product p ON PC.MaSP_P = p.MaSP
JOIN Manufacturer m ON p.MaNSX = m.MaNSX
WHERE m.TenNSX = 'Dell' AND p.loai = 'PC';

-- Câu lệnh cập nhật
UPDATE PC
SET price = price * 1.10
WHERE MaSP_P IN (
    SELECT p.MaSP
    FROM Product p
    JOIN Manufacturer m ON p.MaNSX = m.MaNSX
    WHERE m.TenNSX = 'Dell' AND p.loai = 'PC'
);

-- Sau khi cập nhật
SELECT PC.* FROM PC
JOIN Product p ON PC.MaSP_P = p.MaSP
JOIN Manufacturer m ON p.MaNSX = m.MaNSX
WHERE m.TenNSX = 'Dell' AND p.loai = 'PC';
```

**Giải thích:**
- Câu lệnh `UPDATE` thay đổi dữ liệu trong bảng `PC`.
- `SET price = price * 1.10` nhân giá hiện tại với 1.10 (tăng 10%).
- Mệnh đề `WHERE` sử dụng truy vấn con kết nối bảng `Product` và `Manufacturer` để xác định PC nào thuộc Dell.
- Chạy lệnh `SELECT` trước và sau để xác nhận sự thay đổi giá.

**Kết quả (trước khi cập nhật):**

| MaSP_P | CPU | RAM | HD | price |
|--------|-----|-----|----|-------|
| SP01 | 3.2 | 16 | 512 | 800.00 |
| SP02 | 2.8 | 8 | 256 | 600.00 |
| SP23 | 3.5 | 16 | 512 | 900.00 |

**Kết quả (sau khi cập nhật):**

| MaSP_P | CPU | RAM | HD | price |
|--------|-----|-----|----|-------|
| SP01 | 3.2 | 16 | 512 | 880.00 |
| SP02 | 2.8 | 8 | 256 | 660.00 |
| SP23 | 3.5 | 16 | 512 | 990.00 |

> _[Chèn ảnh chụp màn hình: Trước và sau khi cập nhật trong SSMS]_

---

### Câu 3: Tìm NSX có ít nhất 2 máy tính thuộc loại khác nhau có cùng tốc độ CPU

**Câu truy vấn:**

```sql
SELECT DISTINCT m.TenNSX
FROM Manufacturer m
JOIN Product p1 ON m.MaNSX = p1.MaNSX
JOIN Product p2 ON m.MaNSX = p2.MaNSX
JOIN PC ON p1.MaSP = PC.MaSP_P
JOIN Laptop ON p2.MaSP = Laptop.MaSP_L
WHERE PC.CPU = Laptop.CPU;
```

**Giải thích:**
- Kết nối bảng `Product` hai lần: một lần cho PC (`p1`) và một lần cho Laptop (`p2`), cả hai đều thuộc cùng nhà sản xuất (`m.MaNSX`).
- Kết nối `p1` với bảng `PC` và `p2` với bảng `Laptop` để truy cập thông số CPU.
- Điều kiện `PC.CPU = Laptop.CPU` đảm bảo cả hai loại máy tính có cùng tốc độ CPU.
- Điều này đảm bảo có ít nhất 2 máy tính (1 PC + 1 Laptop) thuộc loại khác nhau với CPU giống nhau.

**Kết quả:**

| TenNSX |
|--------|
| Apple |
| Asus |
| Dell |
| HP |
| Lenovo |
| MSI |

- **Apple:** PC SP14 (CPU 3.2) trùng với Laptop SP13 (CPU 3.2)
- **Asus:** PC SP05 (CPU 2.5) trùng với Laptop SP10 (CPU 2.5)
- **Dell:** PC SP02 (CPU 2.8) trùng với Laptop SP06 (CPU 2.8)
- **HP:** PC SP03 (CPU 3.0) trùng với Laptop SP07 (CPU 3.0)
- **Lenovo:** PC SP04 (CPU 3.2) trùng với Laptop SP08 (CPU 3.2)
- **MSI:** PC SP16 (CPU 3.5) trùng với Laptop SP15 (CPU 3.5)

> _[Chèn ảnh chụp màn hình: Kết quả câu 3 trong SSMS]_

---

### Câu 4: Tìm NSX mà tất cả sản phẩm (PC hoặc Laptop) đều có dung lượng ổ cứng ít nhất 256 GB

**Câu truy vấn:**

```sql
SELECT DISTINCT m.TenNSX
FROM Manufacturer m
WHERE m.MaNSX IN (SELECT MaNSX FROM Product)
  AND m.MaNSX NOT IN (
      SELECT p.MaNSX FROM Product p
      JOIN PC ON p.MaSP = PC.MaSP_P
      WHERE PC.HD < 256
  )
  AND m.MaNSX NOT IN (
      SELECT p.MaNSX FROM Product p
      JOIN Laptop ON p.MaSP = Laptop.MaSP_L
      WHERE Laptop.HD < 256
  );
```

**Giải thích:**
- Bắt đầu với tất cả nhà sản xuất có ít nhất một sản phẩm (`IN (SELECT MaNSX FROM Product)`).
- Loại bỏ các NSX có bất kỳ PC nào có `HD < 256` bằng truy vấn con `NOT IN` đầu tiên.
- Loại bỏ các NSX có bất kỳ Laptop nào có `HD < 256` bằng truy vấn con `NOT IN` thứ hai.
- Các NSX còn lại là những NSX mà **tất cả** sản phẩm đều có HD ≥ 256 GB.

**Kết quả:**

| TenNSX |
|--------|
| Dell |
| HP |
| Lenovo |
| Asus |
| Acer |
| Apple |
| MSI |
| Gigabyte |
| Samsung |
| Toshiba |

Tất cả các NSX trong dữ liệu mẫu đều có sản phẩm với HD ≥ 256 GB (giá trị nhỏ nhất là 256 GB).

> _[Chèn ảnh chụp màn hình: Kết quả câu 4 trong SSMS]_

---

### Câu 5: Tìm NSX của Laptop có dung lượng ổ cứng lớn nhất

**Câu truy vấn:**

```sql
SELECT m.TenNSX
FROM Manufacturer m
JOIN Product p ON m.MaNSX = p.MaNSX
JOIN Laptop l ON p.MaSP = l.MaSP_L
WHERE l.HD = (SELECT MAX(HD) FROM Laptop);
```

**Giải thích:**
- Truy vấn con `SELECT MAX(HD) FROM Laptop` tìm dung lượng ổ cứng lớn nhất trong tất cả laptop (1024 GB).
- Truy vấn chính kết nối ba bảng `Manufacturer`, `Product`, `Laptop` và lọc các laptop có HD bằng giá trị lớn nhất.
- Trả về tên nhà sản xuất của (các) laptop có ổ cứng lớn nhất.

**Kết quả:**

| TenNSX |
|--------|
| Lenovo |
| MSI |

Laptop SP08 của Lenovo và SP15 của MSI có HD = 1024 GB, là các giá trị lớn nhất.

> _[Chèn ảnh chụp màn hình: Kết quả câu 5 trong SSMS]_

---

### Câu 6: Xóa tất cả NSX không sản xuất bất kỳ sản phẩm Laptop nào

**Câu truy vấn:**

```sql
-- Bước 1: Xem NSX sẽ bị xóa
SELECT * FROM Manufacturer
WHERE MaNSX NOT IN (
    SELECT DISTINCT MaNSX FROM Product WHERE loai = 'Laptop'
);

-- Bước 2: Xóa PC của các NSX đó (xóa bản ghi con trước)
DELETE FROM PC
WHERE MaSP_P IN (
    SELECT MaSP FROM Product
    WHERE MaNSX NOT IN (
        SELECT DISTINCT MaNSX FROM Product WHERE loai = 'Laptop'
    )
);

-- Bước 3: Xóa sản phẩm của các NSX đó
DELETE FROM Product
WHERE MaNSX NOT IN (
    SELECT DISTINCT MaNSX FROM Product WHERE loai = 'Laptop'
);

-- Bước 4: Xóa NSX
DELETE FROM Manufacturer
WHERE MaNSX NOT IN (
    SELECT DISTINCT MaNSX FROM Product WHERE loai = 'Laptop'
);

-- Bước 5: Kiểm tra kết quả
SELECT * FROM Manufacturer;
```

**Giải thích:**
- Do ràng buộc khóa ngoại, phải xóa theo thứ tự: PC → Product → Manufacturer.
- Điều kiện `NOT IN (SELECT DISTINCT MaNSX FROM Product WHERE loai = 'Laptop')` xác định các NSX không có sản phẩm Laptop.
- Bước 1 xem trước NSX nào sẽ bị xóa.
- Bước 2–4 thực hiện xóa theo tầng.
- Bước 5 kiểm tra NSX đã được xóa.

**Kết quả (NSX bị xóa):**

| MaNSX | TenNSX | DiaChi |
|-------|--------|--------|
| NSX05 | Acer | Hsinchu, Taiwan |
| NSX08 | Gigabyte | Taipei, Taiwan |
| NSX09 | Samsung | Seoul, Korea |

**Kết quả (các NSX còn lại sau khi xóa):**

| MaNSX | TenNSX | DiaChi |
|-------|--------|--------|
| NSX01 | Dell | Texas, USA |
| NSX02 | HP | California, USA |
| NSX03 | Lenovo | Beijing, China |
| NSX04 | Asus | Taipei, Taiwan |
| NSX06 | Apple | California, USA |
| NSX07 | MSI | Taipei, Taiwan |
| NSX10 | Toshiba | Tokyo, Japan |

> _[Chèn ảnh chụp màn hình: Trước và sau khi xóa trong SSMS]_

---

## 2B. Tối Ưu Hóa Truy Vấn

Trong phần này, mỗi câu truy vấn ở Phần 2A được viết lại sử dụng các kỹ thuật tối ưu hóa. Các kỹ thuật chính được sử dụng:

1. **`NOT EXISTS` thay cho `NOT IN`** — xử lý an toàn đối với giá trị NULL (về mặt hiệu suất có thể tương đương do Optimizer tự động dùng Anti Semi Join)
2. **`EXISTS` thay cho `IN`** — hỗ trợ tối ưu hóa tốt hơn trong nhiều ngữ cảnh (dừng sớm short-circuit)
3. **Tạo chỉ mục (Index)** — tăng tốc các phép JOIN và mệnh đề WHERE
4. **Phân tích Execution Plan** — so sánh hiệu suất trước và sau khi tối ưu

### Tạo chỉ mục

```sql
CREATE INDEX idx_product_mansx ON Product(MaNSX);
CREATE INDEX idx_product_loai ON Product(loai);
CREATE INDEX idx_pc_cpu ON PC(CPU);
CREATE INDEX idx_pc_hd ON PC(HD);
CREATE INDEX idx_laptop_cpu ON Laptop(CPU);
CREATE INDEX idx_laptop_hd ON Laptop(HD);
```

> _[Chèn ảnh chụp màn hình: Kết quả tạo chỉ mục]_

---

### Tối ưu Câu 1: NSX chỉ sản xuất PC

**Cách gốc:** `NOT IN` với truy vấn con  
**Cách tối ưu:** `NOT EXISTS` với truy vấn con tương quan

```sql
SELECT DISTINCT m.TenNSX
FROM Manufacturer m
JOIN Product p ON m.MaNSX = p.MaNSX
WHERE p.loai = 'PC'
  AND NOT EXISTS (
      SELECT 1 FROM Product p2
      WHERE p2.MaNSX = m.MaNSX AND p2.loai = 'Laptop'
  );
```

**Nhận xét về tối ưu:**
- **Về hiệu suất (Performance):** Như trên thực tế (nhìn vào Execution Plan), trình tối ưu hóa (Optimizer) của SQL Server thường rất thông minh, nhận diện và biên dịch cả `NOT IN` lẫn `NOT EXISTS` thành cùng một kế hoạch thực thi chung là **Left Anti Semi Join**. Do đó, **hiệu suất thực tế tương đối của 2 câu truy vấn thường hoàn toàn giống nhau (50% và 50%)**.
- **Tại sao vẫn ưu tiên dùng NOT EXISTS:** Lợi thế lớn nhất của `NOT EXISTS` phụ thuộc vào tính **an toàn dữ liệu (NULL safety)**. Nếu tập kết quả của biểu thức truy vấn con chứa bất kỳ một dòng nào mang giá trị `NULL`, mệnh đề `NOT IN` sẽ thất bại và đánh giá là `UNKNOWN`, dẫn đến việc không có kết quả nào được trả về. `NOT EXISTS` thì bỏ qua các dòng không thoả và đảm bảo tính đúng đắn này một cách an toàn hơn.

> _[Chèn ảnh chụp màn hình: So sánh Execution Plan — gốc vs. tối ưu]_

---

### Tối ưu Câu 2: Tăng giá PC Dell thêm 10%

**Cách gốc:** `IN` với truy vấn con  
**Cách tối ưu:** `EXISTS` với truy vấn con tương quan

```sql
UPDATE PC
SET price = price * 1.10
WHERE EXISTS (
    SELECT 1
    FROM Product p
    JOIN Manufacturer m ON p.MaNSX = m.MaNSX
    WHERE p.MaSP = PC.MaSP_P
      AND m.TenNSX = 'Dell'
      AND p.loai = 'PC'
);
```

**Tại sao tốt hơn:**
- `EXISTS` sử dụng truy vấn con tương quan, có thể tận dụng chỉ mục trên `Product(MaSP)` (khóa chính) để tra cứu nhanh.
- Trình tối ưu truy vấn có thể sử dụng chiến lược semi-join, thường hiệu quả hơn việc lưu toàn bộ kết quả truy vấn con `IN` vào bộ nhớ.

> _[Chèn ảnh chụp màn hình: So sánh Execution Plan — gốc vs. tối ưu]_

---

### Tối ưu Câu 3: NSX có máy tính khác loại cùng tốc độ CPU

**Cách gốc:** Nhiều phép JOIN  
**Cách tối ưu:** `EXISTS` lồng nhau + chỉ mục

```sql
SELECT DISTINCT m.TenNSX
FROM Manufacturer m
WHERE EXISTS (
    SELECT 1
    FROM Product p1
    JOIN PC ON p1.MaSP = PC.MaSP_P
    WHERE p1.MaNSX = m.MaNSX
      AND EXISTS (
          SELECT 1
          FROM Product p2
          JOIN Laptop ON p2.MaSP = Laptop.MaSP_L
          WHERE p2.MaNSX = m.MaNSX
            AND Laptop.CPU = PC.CPU
      )
);
```

**Tại sao tốt hơn:**
- `EXISTS` lồng nhau cho phép trình tối ưu dừng sớm: khi tìm được cặp PC-Laptop khớp cho một NSX, nó chuyển ngay sang NSX tiếp theo.
- Các chỉ mục `idx_pc_cpu` và `idx_laptop_cpu` tăng tốc phép so sánh CPU.
- Tránh tích Descartes xảy ra khi dùng nhiều JOIN trong truy vấn gốc.

> _[Chèn ảnh chụp màn hình: So sánh Execution Plan — gốc vs. tối ưu]_

---

### Tối ưu Câu 4: NSX mà tất cả sản phẩm có HD ≥ 256 GB

**Cách gốc:** `NOT IN` với `UNION`  
**Cách tối ưu:** `NOT EXISTS` với truy vấn con tương quan

```sql
SELECT m.TenNSX
FROM Manufacturer m
WHERE EXISTS (SELECT 1 FROM Product WHERE MaNSX = m.MaNSX)
  AND NOT EXISTS (
      SELECT 1 FROM Product p
      JOIN PC ON p.MaSP = PC.MaSP_P
      WHERE p.MaNSX = m.MaNSX AND PC.HD < 256
  )
  AND NOT EXISTS (
      SELECT 1 FROM Product p
      JOIN Laptop ON p.MaSP = Laptop.MaSP_L
      WHERE p.MaNSX = m.MaNSX AND Laptop.HD < 256
  );
```

**Tại sao tốt hơn:**
- Thay thế `NOT IN` bằng `NOT EXISTS` cho an toàn NULL và short-circuit.
- Loại bỏ phép `UNION` trong truy vấn con, giảm nhu cầu kết hợp và loại trùng tập kết quả.
- Các chỉ mục `idx_pc_hd` và `idx_laptop_hd` cho phép quét phạm vi nhanh cho điều kiện `HD < 256`.

> _[Chèn ảnh chụp màn hình: So sánh Execution Plan — gốc vs. tối ưu]_

---

### Tối ưu Câu 5: NSX của Laptop có ổ cứng lớn nhất

**Cách gốc:** Truy vấn con với `MAX`  
**Cách tối ưu:** `TOP 1` với `ORDER BY`

```sql
SELECT TOP 1 WITH TIES m.TenNSX
FROM Manufacturer m
JOIN Product p ON m.MaNSX = p.MaNSX
JOIN Laptop l ON p.MaSP = l.MaSP_L
ORDER BY l.HD DESC;
```

**Tại sao tốt hơn:**
- `TOP 1 WITH TIES` kết hợp `ORDER BY l.HD DESC` tránh truy vấn con `MAX` riêng biệt, giảm số lần quét bảng từ 2 xuống 1.
- Mệnh đề `WITH TIES` đảm bảo trả về tất cả NSX có cùng HD lớn nhất.
- Chỉ mục `idx_laptop_hd` hỗ trợ phép sắp xếp.

> _[Chèn ảnh chụp màn hình: So sánh Execution Plan — gốc vs. tối ưu]_

---

### Tối ưu Câu 6: Xóa NSX không sản xuất Laptop

**Cách gốc:** `NOT IN` cho mỗi lệnh DELETE  
**Cách tối ưu:** `NOT EXISTS` cho mỗi lệnh DELETE

```sql
-- Xóa PC
DELETE FROM PC
WHERE EXISTS (
    SELECT 1 FROM Product p
    WHERE p.MaSP = PC.MaSP_P
      AND NOT EXISTS (
          SELECT 1 FROM Product p2
          WHERE p2.MaNSX = p.MaNSX AND p2.loai = 'Laptop'
      )
);

-- Xóa Product
DELETE FROM Product
WHERE NOT EXISTS (
    SELECT 1 FROM Product p2
    WHERE p2.MaNSX = Product.MaNSX AND p2.loai = 'Laptop'
);

-- Xóa Manufacturer
DELETE FROM Manufacturer
WHERE NOT EXISTS (
    SELECT 1 FROM Product
    WHERE Product.MaNSX = Manufacturer.MaNSX AND loai = 'Laptop'
);
```

**Tại sao tốt hơn:**
- `NOT EXISTS` với truy vấn con tương quan thường hiệu quả hơn `NOT IN` cho thao tác DELETE vì tránh xây dựng tập kết quả hoàn chỉnh trong bộ nhớ.
- Chỉ mục `idx_product_loai` tăng tốc bộ lọc `loai = 'Laptop'`.

> _[Chèn ảnh chụp màn hình: So sánh Execution Plan — gốc vs. tối ưu]_

---

## 3. Phát Triển Ứng Dụng Cơ Sở Dữ Liệu

### 3.1 Công nghệ sử dụng

| Thành phần | Công nghệ |
|------------|-----------|
| Runtime | Node.js v18+ |
| Web Framework | Express.js |
| Database Driver | mssql (node-mssql) |
| Giao diện | HTML5, CSS3, JavaScript |

### 3.2 Các chức năng của ứng dụng

Ứng dụng cung cấp một chức năng tinh gọn là **SQL Runner**:
Cho phép người dùng trực tiếp nhập bất kỳ câu lệnh SQL nào (SELECT, INSERT, UPDATE, DELETE, v.v.) vào khung văn bản, nhấn chạy và nhận kết quả trực tiếp từ cơ sở dữ liệu hiển thị dưới dạng bảng ngay trên giao diện web.

### 3.3 Cấu trúc dự án

```
computer-management-app/
├── server.js          # Máy chủ Express + API routes
├── db.js              # Cấu hình kết nối SQL Server
├── package.json       # Các dependencies
└── public/
    ├── index.html     # Giao diện chính
    ├── style.css      # Bảng kiểu
    └── app.js         # Logic giao diện (fetch API)
```

### 3.4 Các thành phần chính

#### Kết nối CSDL (`db.js`)

```javascript
const sql = require('mssql');

const config = {
    server: 'localhost\\SQLEXPRESS',
    database: 'ComputerManufacturing',
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: 'your_password'
        }
    }
};

async function getPool() {
    return await sql.connect(config);
}

module.exports = { sql, getPool };
```

#### Các API Route (`server.js`)

```javascript
const express = require('express');
const cors = require('cors');
const { sql, getPool } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/query', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) return res.status(400).json({ error: 'Query is empty' });
        
        const pool = await getPool();
        const result = await pool.request().query(query);
        
        res.json({ 
            success: true, 
            data: result.recordset, 
            rowsAffected: result.rowsAffected 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
```

### 3.5 Ảnh chụp màn hình ứng dụng

> _[Chèn ảnh chụp màn hình: Giao diện Web SQL Runner]_  
> _[Chèn ảnh chụp màn hình: Kết quả thực thi câu lệnh truy vấn Data]_  

---

## Tài liệu tham khảo

1. Microsoft SQL Server Documentation – https://learn.microsoft.com/en-us/sql/sql-server/
2. SQL Server Management Studio – https://learn.microsoft.com/en-us/sql/ssms/
3. Node.js mssql package – https://www.npmjs.com/package/mssql
