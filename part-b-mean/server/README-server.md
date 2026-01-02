# How to run WebAppProject Server

Set .env values:
- PORT = <PORT> (DEFAULT is 3000)
- SESSION_SECRET = <SESSION_SECRET> (DEFAULT is secret)
- MONGO_URL=<MONGO_URL> (DEFAULT none)

```bash
# On the part-b-mean/server directory

# Install dependencies
npm install
# DEMO
npm run dev
# ACTUAL
npm run start
```

# WebAppProject API Documentation

## **BASIC STUFF**
Base URL: `http://localhost:3000`  
All authenticated requests **MUST INCLUDE COOKIES**:

```js
// EXAMPLE
fetch('http://localhost:3000/api/users/me', {
  credentials: 'include'
});
```

---
## **Authentication & Users**


### **POST /api/users/register** 

Register a new user and automatically create a session.

```json
// REQUEST BODY
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

```json
// RESPONSE
(201 Created)
```

NOTES:
- Sets session cookie (webapp.sid)
- User is logged in after successful register

---

### **POST /api/users/login**

Authenticate user and create session.

```json
// REQUEST BODY
{
  "username": "string",
  "password": "string"
}
```

```json
// RESPONSE
200 (OK)
```

NOTES:
- Sets session cookie
- Invalid credentials return 401

---

### **POST /api/users/logout**

Destroy current session.

**Auth required**: Yes

```json
// RESPONSE
200 (OK)
```

NOTES:
- Clears session cookie

---

### **GET /api/users/me**

Get currently authenticated user.

**Auth required**: Yes

```json
// RESPONSE
200 (OK)
```

---

### **PUT /api/users/me**

Update user's characteristics.

**Auth required**: Yes

```json
// REQUEST
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

```json
// RESPONSE
200 (OK)
```

NOTES:
- handles cases like username parameter is empty and others are filled

---

### **DELETE /api/users/me**

Deletes user by profile option.

**Auth required**: Yes

```json
// RESPONSE
200 (OK)
```

---


## **Courses**

### **GET /api/courses**

Get all courses

```json
// RESPONSE
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "category": number,
    "difficulty": number
  }
]
```


---

### **GET /api/courses/:id**
Get a course by id param

```json
// RESPONSE
{
    "_id": "string",
    "title": "string",
    "description": "string",
    "category": number,
    "difficulty": number
}
```

---

### **POST /api/courses/search**

Fetch all courses with specified filters.

```json
// REQUEST
{
  "categories": [1, 3, 5],
  "difficulties": [2, 4]
}
```

```json
// RESPONSE
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "category": number,
    "difficulty": number
  }
]
```

---

### **POST /api/courses**

Create a new course

**Admin required:** Yes

```json
// REQUEST
{
  "title": "string",
  "description": "string",
  "category": number,
  "difficulty": number
}
```

```json
// RESPONSE
201 (Created)
```

---

### **PUT /api/courses/:id**

Update a course by id

**Admin required:** Yes

```json
// REQUEST
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "category": number,
  "difficulty": number
}
```

```json
// RESPONSE
200 (Updated)
```

---

### **DELETE /api/courses**

Delete a course

**Admin required:** Yes

```json
// REQUEST
{
  "_id": "string",
}
```

```json
// RESPONSE
200 (Deleted)
```

---

## **Enrollments**

### **GET /api/enrollments**

Get all enrollments of current user.

**Auth required**: Yes

```json
// RESPONSE
[
  {
    "course": {
      "_id": "string",
      "title": "string"
    },
    "progress": number,
    "status": "ENROLLED"
  }
]
```

---

### **POST /api/enrollments/enroll**

Enroll current user to a course.

**Auth required**: Yes

```json
// RESPONSE
200 (OK)
```

Notes:
- User cannot enroll twice in the same course

---

### **PUT /api/enrollments/progress**

Update an enrollment's progress

**Auth required**: Yes

```json
```


### **Error Codes:**
- (400 - Bad Request)
- (401 - Unauthorized)
- (403 - Forbidden)
- (404 - Not Found)
- (500 - Server Error)