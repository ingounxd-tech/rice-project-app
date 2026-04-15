💻 วิธีการติดตั้งและรัน (Setup Instructions)

1. สิ่งที่ต้องเตรียม (Prerequisites)

Python 3.9 หรือสูงกว่า

XAMPP (สำหรับรัน Apache Server)

Web Browser (แนะนำ Chrome หรือ Edge)

2. การตั้งค่า Backend (Inference Service)

เปิด Terminal หรือ PowerShell แล้วเข้าไปที่โฟลเดอร์ inference-service

cd Rice-Project/inference-service


สร้าง Virtual Environment และติดตั้ง Library ที่จำเป็น

python -m venv venv
.\venv\Scripts\activate
pip install tensorflow fastapi uvicorn pillow python-multipart


เริ่มรัน Server ของ AI

python main.py


หากสำเร็จจะขึ้นข้อความ: Uvicorn running on http://0.0.0.0:8000 (ห้ามปิดหน้าต่างนี้ขณะใช้งาน)

3. การตั้งค่า Frontend (หน้าเว็บ)

คัดลอกโฟลเดอร์ Rice-Project ทั้งหมดไปวางไว้ที่ C:\xampp\htdocs\

เปิด XAMPP Control Panel แล้วกดปุ่ม Start ที่เมนู Apache

เข้าใช้งานผ่านเบราว์เซอร์ที่: http://localhost/Rice-Project/
