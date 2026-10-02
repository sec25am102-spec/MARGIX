# 🚧 MARGIX – Monitoring And Road Guard Intelligence eXchange

### Smarter Roads. Faster Repairs. Safer Lives. 🛣️

MARGIX is an **AI-powered road infrastructure monitoring and municipal response system** designed to automatically detect road hazards such as **potholes, road cracks, open manholes, and waterlogged roads**.

The system uses **AI-based computer vision, GPS localization, Google Maps, and a municipal dashboard** to help authorities identify and respond to road hazards faster.

---

## 🎯 Problem Statement

Road hazards such as potholes and open manholes can become dangerous, especially during rainfall and waterlogging.

### Existing Problems

- 🚗 Potholes increase after rainfall.
- ⚠️ Open manholes can become difficult to notice during waterlogging.
- 🚑 Road hazards may cause accidents.
- 👷 Municipal inspections are mostly manual.
- 📝 Complaint-based reporting can take time.
- 🗺️ Hazard locations are difficult to monitor continuously.

---

## 💡 Proposed Solution

MARGIX uses a **vehicle-mounted camera and AI detection system** to identify road hazards automatically.

### Core Process

**Capture → Detect → Locate → Assess → Report → Resolve**

The system:

1. 📷 Captures road images using a camera.
2. 🤖 Detects road hazards using AI.
3. 📍 Obtains the GPS location.
4. 📊 Estimates hazard severity.
5. ☁️ Stores the hazard information.
6. 🚨 Sends alerts to the municipal authority.
7. 🛠️ Helps repair teams prioritize road issues.

---

## 🧠 Hazards Detected

MARGIX can identify:

| Hazard | Example |
|---|---|
| 🕳️ Pothole | Damaged road surface |
| ⚠️ Open Manhole | Uncovered manhole |
| 🛣️ Road Crack | Cracks on road surface |
| 🌊 Waterlogging | Water-covered road |

---

## 🗺️ Google Maps Integration

The MARGIX dashboard integrates **Google Maps** to visualize road hazards.

### Map Features

- 📍 Hazard markers
- 🕳️ Pothole locations
- ⚠️ Open manhole locations
- 🛣️ Road crack locations
- 🌊 Waterlogging locations
- 🏥 Nearby hospitals
- 👮 Nearby police stations
- ⛽ Nearby petrol pumps
- 🏫 Nearby schools
- 🧭 Google Maps navigation
- 📌 GPS-based hazard locations

Users can select a location and open **Google Maps navigation** to reach the selected location.

---

## 📊 MARGIX Dashboard

The dashboard provides an overview of detected road hazards.

### Dashboard Includes

- Total hazards
- Critical hazards
- High-priority hazards
- Medium/low hazards
- Detected hazards
- Hazards under repair
- Fixed hazards
- Interactive map
- Hazard table
- Nearby essential facilities

---

## 🤖 AI Detection

The AI pipeline follows:

```text
Camera
   ↓
Image Preprocessing
   ↓
AI Object Detection
   ↓
Hazard Classification
   ↓
Confidence Score
   ↓
Severity Analysis
   ↓
GPS Location
   ↓
Municipal Alert
