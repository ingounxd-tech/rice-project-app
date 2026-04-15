import tensorflow as tf
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image
import io
import os

app = FastAPI()

# อนุญาต CORS เพื่อให้หน้าเว็บ (XAMPP) ส่งข้อมูลมาได้
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 1. ส่วนการโหลดโมเดล (.keras format) ---
# ระบุพาธไปยังไฟล์ .keras ของคุณ
MODEL_PATH = "models/rice_model_best.keras"

try:
    # สำหรับไฟล์ .keras ให้ใช้ load_model ปกติได้เลย (ไม่ต้องใช้ TFSMLayer)
    model = tf.keras.models.load_model(MODEL_PATH)
    print(f"✅ โหลดโมเดล {MODEL_PATH} สำเร็จ")
except Exception as e:
    print(f"❌ ไม่สามารถโหลดโมเดลได้: {e}")
    # ตรวจสอบว่าไฟล์มีอยู่จริงไหม
    if not os.path.exists(MODEL_PATH):
        print(f"⚠️ คำเตือน: ไม่พบไฟล์ที่ {os.path.abspath(MODEL_PATH)}")

# ลำดับสายพันธุ์ข้าว (ต้องเรียงตามตัวอักษรเหมือนตอนเทรน)
CLASS_NAMES = ['black_sticky_rice', 'brown_rice', 'jasmine_rice', 'rd6_rice', 'saohai_rice']

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # 1. รับและเตรียมรูปภาพ
        content = await file.read()
        image = Image.open(io.BytesIO(content)).convert('RGB')
        
        # ปรับขนาดเป็น 300x300 ตามที่คุณตั้งค่าไว้ในโค้ดเทรนล่าสุด
        image = image.resize((300, 300)) 
        
        img_array = tf.keras.preprocessing.image.img_to_array(image)
        
        # EfficientNetB0 มักจะมีชั้น Rescaling ในตัวอยู่แล้ว 
        # แต่ถ้าตอนเทรนคุณไม่ได้ใส่ ให้ใช้บรรทัดล่างนี้ (เอาคอมเมนต์ออกถ้าจำเป็น)
        # img_array = img_array / 255.0 
        
        img_array = tf.expand_dims(img_array, 0) # เพิ่มมิติ batch เป็น (1, 300, 300, 3)

        # 2. ให้โมเดลทำนาย
        # สำหรับโมเดลปกติใช้ model.predict() ได้เลย
        predictions_all = model.predict(img_array)
        predictions = predictions_all[0] # ดึงผลลัพธ์ของรูปแรกออกมา

        # 3. จัดกลุ่มผลลัพธ์
        results = []
        for i in range(len(CLASS_NAMES)):
            results.append({
                "predicted_class": CLASS_NAMES[i],
                "confidence": float(predictions[i])
            })
        
        # เรียงลำดับจากความมั่นใจมากไปน้อย และเอา Top 3
        results = sorted(results, key=lambda x: x['confidence'], reverse=True)[:3]

        return {"predictions": results}

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    # รัน Server ที่ Port 8000
    print("🚀 กำลังสตาร์ท Inference Service บน http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)