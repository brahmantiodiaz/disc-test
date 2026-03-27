# 🧠 DISC Personality Test App

A simple web-based DISC personality assessment application built with vanilla JavaScript, Bootstrap, and localStorage.
This app allows users to take a DISC test and enables admins to manage participant data.

---

## 🚀 Features

### 👤 User

- Take DISC personality test
- Answer multiple-choice behavioral questions
- Get instant DISC result (D, I, S, C & combination profiles)
- View personality summary and explanation

### 🛠️ Admin

- Login authentication (localStorage-based)
- View participant list
- Delete participant data
- Persistent data using localStorage

### 🔔 UI & UX

- Responsive layout using Bootstrap
- SweetAlert2 for alerts & toast notifications
- Chart.js for result visualization
- Clean dashboard-style UI

---

## 🧩 Tech Stack

- HTML5
- CSS (Custom + Bootstrap 5)
- JavaScript
- SweetAlert2
- Chart.js
- localStorage (client-side persistence)

## ⚙️ How It Works

### 1. Answer Processing

- Each question has a **most** and **least** choice
- Each choice maps to DISC code (D, I, S, C, \*)

---

### 2. Scoring

Produces:

- Line 1 → Most
- Line 2 → Least
- Line 3 → Final DISC score

---

### 3. Profile Resolution

- Determines dominant personality
- Supports combination profiles (DI, CS, etc.)

---

### 4. Data Storage

All participants stored in:

```js
localStorage["disc_participants"];
```

---

## 🔐 Admin Login

Simple authentication using localStorage:

Used to:

- Show user section in navbar
- Restrict admin pages

---

## 📊 Example Participant Data

```json
{
  "id": "PRT-123456",
  "name": "Budi Santoso",
  "gender": "Laki-laki",
  "age": 25,
  "answers": [...],
  "result": {
    "line1": {},
    "line2": {},
    "line3": {}
  },
  "profile": {
    "key": "DI",
    "title": "COMMANDER"
  },
  "reason": "Profile kamu adalah COMMANDER..."
}
```

## 👨‍💻 Author

Developed by:

- Aulia Brahmantio Diaz
- Luthfia Amalia Tama
- Novandru Oberliebe
- Sabhina Begum

Hacktiv8 Batch 95 🚀

---

## 📄 License

This project is for learning and demonstration purposes.
