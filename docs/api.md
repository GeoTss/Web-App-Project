# WebAppProject API Documentation


## **BASIC STUFF**
Base URL: `http://localhost:3000`  
All authenticated requests **MUST INCLUDE COOKIES**:

```js
fetch(url, 
    {
        credentials: 'include' 
    }
)
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
//RESPONSE
{
  "_id": "string",
  "username": "string",
  "email": "string"
}
```

---

## **Courses**

### **POST /api/courses/search**

Fetch all courses with filters.

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

## Enrollments


### **POST /api/enrollments/:courseId**

Enroll current user to a course.

**Auth required**: Yes

```json
// RESPONSE
200 (OK)
```

Notes:
- User cannot enroll twice in the same course

---

### **GET /api/enrollments/me**

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

### **Error Codes:**
- (400 - Bad Request)
- (401 - Unauthorized)
- (403 - Forbidden)
- (404 - Not Found)
- (500 - Server Error)