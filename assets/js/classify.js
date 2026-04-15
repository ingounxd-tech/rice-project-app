/**
 * Classification Page JavaScript
 * Thai Rice Seed Classification System - Top 3 Results Display
 */

(function() {
    'use strict';

    // ==================== Configuration ====================

    // Supported rice varieties (EXACTLY 5 varieties)
    const SUPPORTED_VARIETIES = {
        'jasmine_rice': 'เมล็ดข้าวหอมมะลิ 105',
        'brown_rice': 'เมล็ดข้าวกล้อง',
        'saohai_rice': 'เมล็ดข้าว กข15',
        'rd6_rice': 'เมล็ดข้าวเหนียว กข6',
        'black_sticky_rice': 'เมล็ดข้าวเหนียวดำ'
    };

    // Variety details with characteristics and benefits
    const VARIETY_DETAILS = {
        'jasmine_rice': {
            name: 'เมล็ดข้าวหอมมะลิ 105',
            englishName: 'Jasmine Rice 105',
            description: 'ข้าวหอมมะลิ 105 เป็นข้าวพันธุ์ที่มีชื่อเสียงระดับโลก ได้รับการยอมรับว่าเป็นข้าวคุณภาพดีเยี่ยม มีกลิ่นหอมเป็นเอกลักษณ์ เหมาะสำหรับการส่งออกและบริโภคภายในประเทศ',
            characteristics: 'เมล็ดยาวเรียว สีขาวใส มีกลิ่นหอมคล้ายดอกมะลิ',
            benefits: 'อุดมไปด้วยคุณค่าทางโภชนาการ เหมาะสำหรับการบริโภคทั่วไป มีกลิ่นหอมและรสชาติอร่อย เป็นข้าวที่มีคุณภาพสูง'
        },
        'brown_rice': {
            name: 'เมล็ดข้าวกล้อง',
            englishName: 'Brown Rice',
            description: 'ข้าวกล้องเป็นข้าวที่ยังคงรำและจมูกข้าวไว้ ทำให้มีคุณค่าทางโภชนาการสูงกว่าข้าวขาวทั่วไป เป็นที่นิยมสำหรับผู้ที่ใส่ใจสุขภาพและต้องการควบคุมน้ำหนัก',
            characteristics: 'เมล็ดสีน้ำตาลอ่อน มีรำและจมูกข้าว เนื้อข้าวแข็งกว่าข้าวขาว',
            benefits: 'อุดมด้วยวิตามิน แร่ธาตุ และเส้นใย ช่วยระบบขับถ่าย ลดความเสี่ยงโรคเบาหวาน และควบคุมน้ำหนัก'
        },
        'saohai_rice': {
            name: 'เมล็ดข้าว กข15',
            englishName: 'RD15',
            description: 'ข้าว กข15 เป็นข้าวพันธุ์ที่พัฒนาโดยกรมการข้าว มีความทนทานต่อโรคและศัตรูพืช ให้ผลผลิตสูง เหมาะสำหรับการเพาะปลูกในพื้นที่ต่างๆ ของประเทศไทย',
            characteristics: 'เมล็ดสั้นกลม สีขาวนวล เนื้อข้าวนุ่มเหนียว',
            benefits: 'ให้ผลผลิตสูง ทนต่อโรคพืช เหมาะสำหรับปลูกในพื้นที่ต่างๆ มีรสชาติดี เมื่อหุงสุกจะนุ่มอร่อย'
        },
        'rd6_rice': {
            name: 'เมล็ดข้าวเหนียว กข6',
            englishName: 'RD6 Sticky Rice',
            description: 'ข้าวเหนียว กข6 เป็นข้าวเหนียวพันธุ์ดีที่นิยมปลูกในภาคเหนือและภาคอีสาน มีความเหนียวสูง รสชาติหวานนุ่ม เหมาะสำหรับการทำขนมไทยและอาหารพื้นเมือง',
            characteristics: 'เมล็ดสีขาวนวล เมื่อหุงสุกมีความเหนียวสูง',
            benefits: 'เหมาะสำหรับทำขนมไทย ข้าวเหนียวนึ่ง และอาหารพื้นเมือง ให้พลังงานสูง มีรสชาติหวานนุ่ม'
        },
        'black_sticky_rice': {
            name: 'เมล็ดข้าวเหนียวดำ',
            englishName: 'Black Sticky Rice',
            description: 'ข้าวเหนียวดำเป็นข้าวพันธุ์พื้นเมืองที่มีคุณค่าทางโภชนาการสูง อุดมด้วยสารแอนโทไซยานิน ซึ่งเป็นสารต้านอนุมูลอิสระ นิยมใช้ทำขนมหวานและอาหารเพื่อสุขภาพ',
            characteristics: 'เมล็ดสีม่วงดำ มีเยื่อหุ้มสีเข้ม เมื่อหุงสุกมีความเหนียว',
            benefits: 'อุดมด้วยสารแอนโทไซยานิน ต้านอนุมูลอิสระ ช่วยบำรุงสายตา ลดความเสี่ยงโรคหัวใจ และมีคุณค่าทางโภชนาการสูง'
        }
    };

    // ==================== DOM Elements ====================
    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');
    const cameraInput = document.getElementById('cameraInput');
    const openUploadModalBtn = document.getElementById('openUploadModal');
    const uploadDropdown = document.getElementById('uploadDropdown');
    const selectFromGallery = document.getElementById('selectFromGallery');
    const selectFromCamera = document.getElementById('selectFromCamera');
    const previewArea = document.getElementById('previewArea');
    const previewImage = document.getElementById('previewImage');
    const removeImageBtn = document.getElementById('removeImage');
    const classifyBtn = document.getElementById('classifyBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultArea = document.getElementById('resultArea');

    let selectedFile = null;

    // ==================== Event Listeners ====================

    // Toggle dropdown when clicking the button
    openUploadModalBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
    });

    // Click on upload area to open dropdown
    uploadArea.addEventListener('click', (e) => {
        // Only open dropdown if clicking on the upload area itself, not the button
        if (e.target === uploadArea || uploadArea.contains(e.target) && !openUploadModalBtn.contains(e.target)) {
            toggleDropdown();
        }
    });

    // Select from gallery
    selectFromGallery.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDropdown();
        imageInput.value = ''; // Reset input to allow selecting the same file
        imageInput.click();
    });

    // Select from camera - Will be handled in webcam section below
    // Removed old event listener that opened file picker

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!uploadDropdown.contains(e.target) && !openUploadModalBtn.contains(e.target)) {
            closeDropdown();
        }
    });

    // Photography Guide Toggle
    const photoGuideToggle = document.getElementById('photoGuideToggle');
    const photoGuideContent = document.getElementById('photoGuideContent');
    const chevronIcon = document.getElementById('chevronIcon');

    if (photoGuideToggle) {
        photoGuideToggle.addEventListener('click', () => {
            photoGuideContent.classList.toggle('open');
            chevronIcon.classList.toggle('open');
        });
    }

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('dragover');
        }, false);
    });

    // Handle dropped files
    uploadArea.addEventListener('drop', handleDrop, false);

    // Handle file selection from gallery
    imageInput.addEventListener('change', handleFileSelect, false);

    // Handle file selection from camera
    cameraInput.addEventListener('change', handleFileSelect, false);

    // Remove image button
    removeImageBtn.addEventListener('click', resetUpload);

    // Classify button
    classifyBtn.addEventListener('click', classifyImage);

    // Reset button
    resetBtn.addEventListener('click', resetUpload);

    // ==================== Dropdown Functions ====================

    function toggleDropdown() {
        uploadDropdown.classList.toggle('show');
    }

    function closeDropdown() {
        uploadDropdown.classList.remove('show');
    }

    // ==================== Functions ====================

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0) {
            handleFile(files[0]);
        }
    }

    function handleFileSelect(e) {
        const files = e.target.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    }

    function handleFile(file) {
        // Validate file
        const validation = window.RiceUtils.validateImageFile(file);
        
        if (!validation.valid) {
            window.RiceUtils.showToast(validation.error, 'danger');
            return;
        }

        selectedFile = file;

        // Show preview
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            uploadArea.classList.add('hidden');
            previewArea.classList.remove('hidden');
            resultArea.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }

    function resetUpload() {
        selectedFile = null;
        imageInput.value = '';
        previewImage.src = '';
        uploadArea.classList.remove('hidden');
        previewArea.classList.add('hidden');
        resultArea.classList.add('hidden');
        resultArea.innerHTML = '';
    }

async function classifyImage() {
        if (!selectedFile) {
            window.RiceUtils.showToast('กรุณาเลือกไฟล์ภาพก่อน', 'warning');
            return;
        }

        // 1. แสดงสถานะกำลังโหลด
        classifyBtn.disabled = true;
        classifyBtn.innerHTML = `
            <svg class="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            กำลังวิเคราะห์...
        `;

        // 2. เตรียมข้อมูลรูปภาพเพื่อส่งไปที่ Server
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            // 3. ส่งข้อมูลไปยัง Python Backend (Inference Service)
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('การเชื่อมต่อ Server ผิดพลาด');

            const result = await response.json();

            // 4. นำผลลัพธ์ที่ได้จาก AI มาแสดงผล (สมมติว่า API ส่งกลับเป็น list ของผลลัพธ์)
            // คุณอาจต้องปรับโครงสร้างข้อมูลตรงนี้ให้ตรงกับที่ main.py ส่งกลับมา
            displayResults(result.predictions); 

        } catch (error) {
            console.error('Error:', error);
            window.RiceUtils.showToast('ไม่สามารถเชื่อมต่อบริการวิเคราะห์ได้ กรุณาตรวจสอบว่ารัน main.py อยู่', 'danger');
        } finally {
            // 5. คืนค่าปุ่มให้กดได้ใหม่
            classifyBtn.disabled = false;
            classifyBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                เริ่มวิเคราะห์
            `;
        }
    }

    // Note: mock result generator removed. Implement API call to inference service here.

    function displayResults(results) {
        // Build result HTML for top 3 - Clean & Simple UI
        let resultHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.25rem;">
                    ผลการวิเคราะห์
                </h3>
                <p style="color: var(--text-gray); font-size: 0.875rem;">
                    แสดง 3 อันดับที่มีความน่าจะเป็นสูงสุด
                </p>
            </div>

            <div style="display: grid; gap: 1rem; max-width: 600px; margin: 0 auto;">
        `;

        // Display top 3 results - Compact cards
        results.forEach((result, index) => {
            const varietyInfo = VARIETY_DETAILS[result.predicted_class];
            const rankColors = ['#10b981', '#059669', '#047857'];
            const medals = ['🥇', '🥈', '🥉'];
            
            resultHTML += `
                <div style="background: white; 
                            border: 2px solid ${rankColors[index]}; 
                            border-radius: 0.75rem; 
                            padding: 1.25rem;
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                            transition: all 0.3s ease;
                            cursor: pointer;"
                     onmouseover="this.style.boxShadow='0 4px 12px rgba(0, 0, 0, 0.12)'; this.style.transform='translateY(-2px)';"
                     onmouseout="this.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.08)'; this.style.transform='translateY(0)';">
                    
                    <!-- Header with Medal and Name -->
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; flex: 1;">
                            <span style="font-size: 1.5rem;">${medals[index]}</span>
                            <div style="flex: 1;">
                                <div style="font-size: 1.125rem; font-weight: 700; color: ${rankColors[index]};">
                                    ${varietyInfo.name}
                                </div>
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 1.5rem; font-weight: 700; color: ${rankColors[index]};">
                                ${window.RiceUtils.formatPercent(result.confidence)}
                            </div>
                        </div>
                    </div>

                    <!-- Compact Progress Bar -->
                    <div style="background-color: #e5e7eb; border-radius: 9999px; height: 0.5rem; overflow: hidden; margin-bottom: 0.75rem; box-shadow: inset 0 1px 2px rgba(0,0,0,0.06);">
                        <div class="confidence-bar" 
                             style="width: 0%; height: 100%; background-color: ${rankColors[index]}; border-radius: 9999px; transition: width 1s ease;" 
                             data-width="${result.confidence * 100}">
                        </div>
                    </div>

                    <!-- Details Button - Compact -->
                    <button onclick="showRiceDetails('${result.predicted_class}', ${result.confidence})" 
                            class="btn btn-outline" 
                            style="width: 100%; 
                                   padding: 0.5rem 1rem; 
                                   font-size: 0.875rem;
                                   border-color: ${rankColors[index]}; 
                                   color: ${rankColors[index]};
                                   background: transparent;">
                        <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        ดูรายละเอียด
                    </button>
                </div>
            `;
        });

        resultHTML += `</div>`;

        resultArea.innerHTML = resultHTML;
        resultArea.classList.remove('hidden');

        // Animate confidence bars
        setTimeout(() => {
            const bars = resultArea.querySelectorAll('.confidence-bar');
            bars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width') + '%';
            });
        }, 100);

        // Show toast notification
        window.RiceUtils.showToast('วิเคราะห์สำเร็จ!', 'success');
    }

    // ==================== Modal Functions ====================

    // Show rice details in modal
    window.showRiceDetails = function(varietyClass, confidence = null) {
        const varietyInfo = VARIETY_DETAILS[varietyClass];
        if (!varietyInfo) return;

        const modal = document.getElementById('riceModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        // Build title with English name and confidence
        let titleHTML = `<div style="line-height: 1.4;">${varietyInfo.name} (${varietyInfo.englishName})`;
        if (confidence !== null) {
            const confidencePercent = (confidence * 100).toFixed(1);
            titleHTML += `<div style="font-size: 0.9rem; color: var(--text-gray); font-weight: 500; margin-top: 0.25rem;">เปอร์เซ็นต์ความมั่นใจของเมล็ดข้าวสายพันธุ์${varietyInfo.name} = ${confidencePercent}%</div>`;
        }
        titleHTML += `</div>`;
        modalTitle.innerHTML = titleHTML;
        
        modalBody.innerHTML = `
            <div style="padding: 0.5rem 0;">
                <!-- Description Box -->
                <div style="background: white; border: 1.5px solid #d1d5db; border-radius: 0.5rem; padding: 1rem; margin-bottom: 1rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                        <h3 style="font-size: 1rem; font-weight: 700; color: var(--primary-color); margin: 0;">
                            รายละเอียดสายพันธุ์
                        </h3>
                    </div>
                    <p style="color: var(--text-dark); line-height: 1.7; font-size: 0.95rem; margin: 0;">
                        ${varietyInfo.description}
                    </p>
                </div>

                <!-- Characteristics Box -->
                <div style="background: white; border: 1.5px solid #d1d5db; border-radius: 0.5rem; padding: 1rem; margin-bottom: 1rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                        <h3 style="font-size: 1rem; font-weight: 700; color: var(--primary-color); margin: 0;">
                            ลักษณะเมล็ดพันธุ์
                        </h3>
                    </div>
                    <p style="color: var(--text-dark); line-height: 1.7; font-size: 0.95rem; margin: 0;">
                        ${varietyInfo.characteristics}
                    </p>
                </div>

                <!-- Benefits Box -->
                <div style="background: white; border: 1.5px solid #d1d5db; border-radius: 0.5rem; padding: 1rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                        <h3 style="font-size: 1rem; font-weight: 700; color: var(--primary-color); margin: 0;">
                            ประโยชน์
                        </h3>
                    </div>
                    <p style="color: var(--text-dark); line-height: 1.7; font-size: 0.95rem; margin: 0;">
                        ${varietyInfo.benefits}
                    </p>
                </div>
            </div>
        `;

        modal.classList.add('show');
    };

    // Close modal
    window.closeModal = function() {
        const modal = document.getElementById('riceModal');
        modal.classList.remove('show');
    };

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('riceModal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // ==================== Webcam Capture Functionality ====================

    const cameraModal = document.getElementById('cameraModal');
    const closeCameraModalBtn = document.getElementById('closeCameraModal');
    const cameraVideo = document.getElementById('cameraVideo');
    const cameraCanvas = document.getElementById('cameraCanvas');
    const cameraContainer = document.querySelector('.camera-container');
    const captureBtn = document.getElementById('captureBtn');
    const retakeBtn = document.getElementById('retakeBtn');
    const useCapturedBtn = document.getElementById('useCapturedBtn');
    const capturedImage = document.getElementById('capturedImage');
    const capturedImageContainer = document.getElementById('capturedImageContainer');
    const cameraStatus = document.getElementById('cameraStatus');

    let cameraStream = null;

    // Add event listener for selectFromCamera to open camera modal
    if (selectFromCamera) {
        selectFromCamera.addEventListener('click', (e) => {
            e.stopPropagation();
            closeDropdown();
            openCameraModal();
        });
    }

    function openCameraModal() {
        cameraModal.classList.add('show');
        startCamera();
    }

    function closeCameraModal() {
        cameraModal.classList.remove('show');
        stopCamera();
        resetCameraUI();
    }

    async function startCamera() {
        try {
            // Update status
            updateCameraStatus('loading', 'กำลังเปิดกล้อง...');

            // Request camera access
            const constraints = {
                video: {
                    facingMode: 'environment', // Use back camera on mobile
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };

            cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
            cameraVideo.srcObject = cameraStream;

            // Wait for video to be ready
            cameraVideo.onloadedmetadata = () => {
                updateCameraStatus('ready', 'กล้องพร้อมใช้งาน! 📸');
                captureBtn.style.display = 'inline-flex';
            };

        } catch (error) {
            console.error('Error accessing camera:', error);
            
            let errorMessage = 'ไม่สามารถเข้าถึงกล้องได้';
            
            if (error.name === 'NotAllowedError') {
                errorMessage = 'กรุณาอนุญาตให้เข้าถึงกล้องในการตั้งค่าเบราว์เซอร์';
            } else if (error.name === 'NotFoundError') {
                errorMessage = 'ไม่พบกล้องในอุปกรณ์นี้';
            } else if (error.name === 'NotReadableError') {
                errorMessage = 'กล้องกำลังถูกใช้งานโดยโปรแกรมอื่น';
            }
            
            updateCameraStatus('error', errorMessage);
            window.RiceUtils.showToast(errorMessage, 'danger');
        }
    }

    function stopCamera() {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
            cameraVideo.srcObject = null;
        }
    }

    function capturePhoto() {
        // Set canvas size to match video
        cameraCanvas.width = cameraVideo.videoWidth;
        cameraCanvas.height = cameraVideo.videoHeight;

        // Draw video frame to canvas
        const context = cameraCanvas.getContext('2d');
        context.drawImage(cameraVideo, 0, 0, cameraCanvas.width, cameraCanvas.height);

        // Convert canvas to blob
        cameraCanvas.toBlob((blob) => {
            // Display captured image
            const imageUrl = URL.createObjectURL(blob);
            capturedImage.src = imageUrl;
            capturedImageContainer.style.display = 'block';

            // Hide camera container (ซ่อนหน้าจอสีดำ) and buttons
            if (cameraContainer) {
                cameraContainer.style.display = 'none';
            }
            captureBtn.style.display = 'none';
            retakeBtn.style.display = 'inline-flex';
            useCapturedBtn.style.display = 'inline-flex';

            updateCameraStatus('ready', 'ถ่ายรูปสำเร็จ! คุณสามารถถ่ายใหม่หรือใช้รูปนี้');

        }, 'image/jpeg', 0.92);
    }

    function retakePhoto() {
        // Reset UI - แสดง camera container กลับมา
        if (cameraContainer) {
            cameraContainer.style.display = 'block';
        }
        capturedImageContainer.style.display = 'none';
        cameraVideo.style.display = 'block';
        captureBtn.style.display = 'inline-flex';
        retakeBtn.style.display = 'none';
        useCapturedBtn.style.display = 'none';
        
        updateCameraStatus('ready', 'กล้องพร้อมใช้งาน! 📸');
    }

    function useCapturedPhoto() {
        // Convert canvas to blob and create file
        cameraCanvas.toBlob((blob) => {
            // Create a file from blob
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            
            // Use the existing handleFile function
            handleFile(file);
            
            // Close modal
            closeCameraModal();
            
            window.RiceUtils.showToast('เลือกรูปจากกล้องเรียบร้อยแล้ว', 'success');
        }, 'image/jpeg', 0.92);
    }

    function resetCameraUI() {
        if (cameraContainer) {
            cameraContainer.style.display = 'block';
        }
        capturedImageContainer.style.display = 'none';
        cameraVideo.style.display = 'block';
        captureBtn.style.display = 'none';
        retakeBtn.style.display = 'none';
        useCapturedBtn.style.display = 'none';
        updateCameraStatus('loading', 'กำลังเปิดกล้อง...');
    }

    function updateCameraStatus(type, message) {
        cameraStatus.className = `camera-status ${type}`;
        
        let icon = '';
        if (type === 'loading') {
            icon = '<svg style="width: 1.5rem; height: 1.5rem; display: inline; margin-right: 0.5rem; animation: spin 1s linear infinite;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>';
        } else if (type === 'ready') {
            icon = '<svg style="width: 1.5rem; height: 1.5rem; display: inline; margin-right: 0.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        } else if (type === 'error') {
            icon = '<svg style="width: 1.5rem; height: 1.5rem; display: inline; margin-right: 0.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        }
        
        cameraStatus.innerHTML = icon + message;
    }

    // Event listeners for camera modal
    if (closeCameraModalBtn) {
        closeCameraModalBtn.addEventListener('click', closeCameraModal);
    }

    if (captureBtn) {
        captureBtn.addEventListener('click', capturePhoto);
    }

    if (retakeBtn) {
        retakeBtn.addEventListener('click', retakePhoto);
    }

    if (useCapturedBtn) {
        useCapturedBtn.addEventListener('click', useCapturedPhoto);
    }

    // Close camera modal when clicking outside
    if (cameraModal) {
        cameraModal.addEventListener('click', (e) => {
            if (e.target === cameraModal) {
                closeCameraModal();
            }
        });
    }

    // Add CSS animation for spinner if not already present
    if (!document.getElementById('camera-spinner-style')) {
        const style = document.createElement('style');
        style.id = 'camera-spinner-style';
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

})();
