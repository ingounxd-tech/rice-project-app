# 🚀 Quick Start: เมื่อเทรนโมเดลเสร็จจาก Roboflow

## สิ่งที่ต้องทำ (5 ขั้นตอน)

### 1️⃣ Export โมเดลจาก Roboflow
- Format: **TensorFlow SavedModel** (แนะนำ)
- Download และแตกไฟล์
- วางใน: `inference-service/models/saved_model/`

### 2️⃣ ติดตั้ง Python (ถ้ายังไม่มี)
```powershell
# ดาวน์โหลดจาก: https://www.python.org/downloads/
# เลือก Python 3.10 (แนะนำ)
# ติดตั้งโดยเลือก "Add Python to PATH"
```

### 3️⃣ รัน Inference Service
```powershell
# เปิด PowerShell ใน inference-service/
cd inference-service

# สร้าง virtual environment
python -m venv venv
.\venv\Scripts\activate

# ติดตั้ง dependencies
pip install -r requirements.txt

# รัน server
python main.py
```

Server จะรันที่: **http://localhost:8000**

### 4️⃣ แก้ไข classify.js
```powershell
# คัดลอกโค้ดจากไฟล์นี้:
type inference-service\classify.js.update

# แทนที่ฟังก์ชัน classifyImage() ใน:
# assets/js/classify.js
```

### 5️⃣ ทดสอบระบบ
1. เปิด XAMPP → Start Apache
2. เปิด `http://localhost/RiceProject/`
3. อัพโหลดภาพข้าว → คลิก "เริ่มวิเคราะห์"
4. ดูผลลัพธ์ที่ได้จากโมเดลจริง ✅

---

## 🐛 แก้ปัญหาเบื้องต้น

**ถ้า API ไม่ทำงาน:**
```powershell
# ตรวจสอบว่า server กำลังรันอยู่
curl http://localhost:8000/health

# ดู error ที่ terminal ที่รัน python main.py
```

**ถ้าโมเดลไม่โหลด:**
- ตรวจสอบว่าโฟลเดอร์ `models/saved_model/` มีไฟล์ `saved_model.pb`
- ตรวจสอบว่า class names ใน `main.py` ตรงกับที่เทรน

**ถ้า CORS error:**
- ตรวจสอบ URL ใน `classify.js` ว่าตรงกับ server
- เปิด Browser Console (F12) ดู error message

---

## 📖 เอกสารเพิ่มเติม

อ่านคู่มือฉบับละเอียด: [inference-service/README.md](inference-service/README.md)

---

## 💰 ค่าใช้จ่าย

**ฟรี 100%** - รันบนเครื่องของคุณเอง ไม่มีค่า API

ถ้าจะ deploy บน cloud (optional):
- DigitalOcean Droplet: ~$6/เดือน (basic)
- AWS EC2 t3.small: ~$15/เดือน
- Google Cloud Run: Pay-per-request (เริ่ม ~$0)
