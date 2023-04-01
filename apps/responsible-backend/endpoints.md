# Responsible Backend end-points Documentation
## User Authentication

### Login

**Endpoint**: `/api/auth/login`

**Method**: `POST`

**Description**: Login an existing user.

**Request Body**:

| Field | Type | Description |
| --- | --- | --- |
| `email` | string | The email of the user. Must be a valid email address. |
| `password` | string | The password of the user. |

**Response**:

| Status Code | Response Body | Description |
| --- | --- | --- |
| 200 | `{ "user": { .... } }` | User authenticated successfully. |
| 401 | `{ "message": "Invalid email or password." }` | Invalid credentials. |

### Logout

**Endpoint**: `/api/auth/logout`

**Method**: `POST`

**Description**: Logout a user.

**Request Header**:

| Field | Type | Description |
| --- | --- | --- |
| `Authorization` | string | The access token. |

**Response**:

| Status Code | Response Body | Description |
| --- | --- | --- |
| 200 | `` | User logged out successfully. |
| 401 | `{ "message": "Unauthorized" }` | Invalid or expired token. |

### Refresh

**Endpoint**: `/api/auth/refresh`

**Method**: `POST`

**Description**: Refresh the access token.

**Request Header**:

| Field | Type | Description |
| --- | --- | --- |
| `Authorization` | string | The refresh token. |

**Response**:

| Status Code | Response Body | Description |
| --- | --- | --- |
| 200 | `{ "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", .... }` | Access token refreshed successfully. |
| 401 | `{ "message": "Unauthorized" }` | Invalid or expired token. |



## Cows Endpoints

### GET Cows

**Endpoint**: `/api/cows`

**Method**: `GET`

**Description**: Get Cows.

**Response**:

| Status Code | Response Body | Description |
| --- | --- | --- |
| 200 | `{ "cows": [....] }` | Get Cows successfully. |
| 401 | `{ "message": "Unauthorized" }` | Invalid or expired token. |

### Create Cow

**Endpoint**: `/api/cows`

**Method**: `POST`

**Description**: Create Cow.

**Request Body**:

| Field | Type | Description |
| --- | --- | --- |
| `breed` | string | The breed of the cow. |
| `entryDate` | string | The entryDate of the cow. |

**Response**:

| Status Code | Response Body | Description |
| --- | --- | --- |
| 200 | `{ "cow": { .... } }` | Cow created successfully. |
| 401 | `{ "message": "Unauthorized" }` | Invalid or expired token. |

### Update Cow

**Endpoint**: `/api/cows/:id`

**Method**: `PATCH`

**Description**: Update Cow.

**Request Body**:

| Field | Type | Description |
| --- | --- | --- |
| `breed` | string | The breed of the cow. |
| `entryDate` | string | The entryDate of the cow. |

**Response**:

| Status Code | Response Body | Description |
| --- | --- | --- |
| 200 | `{ "cow": { .... } }` | Cow updated successfully. |
| 401 | `{ "message": "Unauthorized" }` | Invalid or expired token. |

### Delete Cow

**Endpoint**: `/api/cows/:id`

**Method**: `DELETE`

**Description**: Delete Cow.

**Response**:

| Status Code | Response Body | Description |
| --- | --- | --- |
| 200 | `{ "cow": { .... } }` | Cow updated successfully. |
| 401 | `{ "message": "Unauthorized" }` | Invalid or expired token. |


## Responsible Endpoints

### Create Responsible

**Endpoint**: `/api/responsibles`

**Method**: `POST`

**Description**: Create a new responsible account.

**Request Body**:

| Field | Type | Description |
| --- | --- | --- |
| `fullName` | string | The fullName of the responsible. Must be at least 6 characters. |
| `email` | string | The email of the responsible. Must be a valid email address. |
| `password` | string | The password of the responsible. Must be at least 6 characters |
| `role` | string | The role of the responsible. Must be at least 6 characters |

**Response**:

| Status Code | Response Body | Description |
| --- | --- | --- |
| 201 | `{ "responsible": { ... }}` | Responsible Created successfully. |
| 400 | `{ "message": "fullName, email and password are required." }` | Required fields are missing. |
| 409 | `{ "message": "Credentials is already registered." }` | Email already exists. |

### Delete Responsible

**Endpoint**: `/api/responsibles/:id`

**Method**: `DELETE`

**Description**: Delete a responsible account.

**Response**:

| Status Code | Response Body | Description |
| --- | --- | --- |
| 204 | `No Content` |  Responsible Deleted successfully. |
| 401 | `{ "message": "Unauthorized" }` | Invalid or expired token. |


