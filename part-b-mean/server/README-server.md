# **WebAppProject Server**

## **How 2 Run** 

Create .env & set values:
- PORT = <PORT> (DEFAULT is 3000)
- SESSION_SECRET = <SESSION_SECRET> (DEFAULT is secret)
- MONGO_URL=<MONGO_URL> (DEFAULT none)

```bash
# On part-b-mean/server directory

# Install dependencies
npm install
# DEMO
npm run dev
# ACTUAL
npm run start
```

## **WebAppProject API Documentation**

### **BASIC STUFF**
Base URL: `http://localhost:3000`  
All authenticated requests **MUST INCLUDE COOKIES**:

```js
// EXAMPLE
fetch('http://localhost:3000/api/users/me', {
  credentials: 'include'
});
```

---

### **Authentication & Users**

#### **POST /api/users/register** 

Register a new user and automatically create a session.

```json
// REQUEST BODY
{
    "username": "string",
    "email": "string",
    "password": "string",
    "category": [...],
    "difficulty": [...]
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

### **post /api/users/logout**

Destroy current session.

**Auth required**: Yes

```json
// RESPONSE
200 (OK)
```

NOTES:
- Clears session cookie.

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
  "password": "string",
  "category": [],
  "difficulty": []
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

Get all courses. (UNUSED)

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

Get a course by id param. (UNUSED)

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
  "category": [1, 3, 5],
  "difficulty": [2, 4]
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


### **GET /api/courses/:id/details**

Get course details by courseId param. 

```json
// RESPONSE
{
    "_id": "string",
    "course": course,
    "title": "string",
    "description": "string",
    "sections": [topics]
}
```

---

### **POST /api/courses**

Create a new course. (UNUSED)

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

Update a course by id. (UNUSED)

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
200 (Updated)
```

---

### **DELETE /api/courses**

Delete a course. (UNUSED)

**Admin required:** Yes

```json
// REQUEST
{
  "courseId": "string"
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
    "_id": "string",
    "user": user,
    "course": course,
    "progress": number,
    "status": number,
    "topics": []
  }
]
```

---

### **GET /api/enrollments/:courseId**

Get enrollment by id. (UNUSED)

**Auth required**: Yes

```json
// RESPONSE
{
  "_id": "string",
  "user": user,
  "course": course,
  "progress": number,
  "status": number,
  "topics": []
}
```

---

### **POST /api/enrollments/enroll**

Enroll current user to a course.

**Auth required**: Yes

```json
//REQUEST
{
  "courseId":"string",
}
```

```json
// RESPONSE
201 (OK)
```

Notes:
- User cannot enroll twice in the same course

---

### **PUT /api/enrollments/progress**

Update an enrollment's progress

**Auth required**: Yes

```json
// REQUEST
{
  "courseId":"string",
  "topicId": "string",
  "check": boolean
}

```

```json
// RESPONSE
200 (OK)
```

---

### **DELETE /api/enrollments/enroll**

Delete an enrollment.

**Auth required**: Yes

```json
// REQUEST
{
  "courseId":"string",
}

```

```json
// RESPONSE
200 (OK)
```

---

### **GET /api/resources/**

Get all resources. (UNUSED)

```json
// RESPONSE for video
{
  "_id": "string",
  "type": number,
  "title": "string",
  "videoId": "string",
  "category": number
}
// RESPONSE for book
{
  "_id": "string",
  "type": number,
  "title": "string",
  "author": "string",
  "url": "string",
  "coverImage": "string",
  "category": number,
}
```

---

### **GET /api/resources/:id**

Get resource by id. (UNUSED)

```json
// RESPONSE for video
{
  "_id": "string",
  "type": number,
  "title": "string",
  "videoId": "string",
  "category": number
}
// RESPONSE for book
{
  "_id": "string",
  "type": number,
  "title": "string",
  "author": "string",
  "url": "string",
  "coverImage": "string",
  "category": number,
}
```

---

### **POST /api/resources/search**

Get resources by type and category.

```json
// REQUEST
{
  "type": [],
  "category": []
}
```

```json
// RESPONSE
200 (OK)
```

---

### **POST /api/resources/**

Create a resource. (UNUSED)

**Admin required:** Yes

```json
// REQUEST
  {
    "type": number,
    "title": "string",
    "author": "string",
    "url": "string",
    "coverImage": "string",
    "videoId": "string",
    "category": number    
  }
```

```json
// RESPONSE
201 (CREATED)
```

---

### **PUT /api/resources/:id**

Update a resource. (UNUSED)

**Admin required:** Yes

```json
// REQUEST
  {
    "type": number,
    "title": "string",
    "author": "string",
    "url": "string",
    "coverImage": "string",
    "videoId": "string",
    "category": number    
  }
```

```json
// RESPONSE
200 (OK)
```

---

### **DELETE /api/resources/:id**

Delete a resource. (UNUSED)

**Admin required:** Yes

```json
// RESPONSE
200 (OK)
```

---


### **Error Codes:**
- (400 - Bad Request)
- (401 - Unauthorized)
- (403 - Forbidden)
- (404 - Not Found)
- (500 - Server Error)