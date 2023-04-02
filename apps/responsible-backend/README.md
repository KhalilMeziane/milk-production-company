# Milk production company Backend App

## Project Structure 
┌ `src`\
├─ `api` \
├── `components` \
├─── `auth` \
├──── `controller.js` \
├──── `route.js` \
├──── `service.js` \
├──── `utils.js` \
├─── `cow` \
├──── `controller.js` \
├──── `route.js` \
├──── `service.js` \
├─── `examination` \
├──── `controller.js` \
├──── `route.js` \
├──── `service.js` \
├─── `milk` \
├──── `controller.js` \
├──── `route.js` \
├──── `service.js` \
├─── `profile` \
├──── `controller.js` \
├──── `route.js` \
├──── `service.js` \
├─── `responsible` \
├──── `controller.js` \
├──── `route.js` \
├──── `service.js` \
├── `middlewares` \
├── `app.js` \
├── `routes.js` \
├─ `config` \
├─ `helpers` \
├─ `server.js` \
└ `.eslintrc.json`


## Project Dependencies
* express
* argon
* nodemon
* dotenv
* cors
* morgan
* yup
* uuid

## Project Environment Variables
To run this project, you will need to add the following environment variables to your .env file:

* `PORT`
* `ACCESS_TOKEN_SECRET`
* `REFRESH_TOKEN_SECRET`


## API Reference

### Auth

```http
  POST /api/auth/login
``` 
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. email |
| `password` | `string` | **Required**. password |

```http
  POST /api/auth/refresh
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `refreshToken` | `string` | **Required**. refreshToken |

```http
  GET /api/auth/logout
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**. accessToken |

### Profile

```http
  GET /api/profile
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**. accessToken |

```http
  PATCH /api/profile
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fullName` | `string` | **Required**. fullName |
| `email` | `string` | **Required**. email 
| `accessToken` | `string` | **Required**. accessToken |

```http
  PATCH /api/profile/password
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `oldPassword` | `string` | **Required**. oldPassword |
| `newPassword` | `string` | **Required**. newPassword 
| `accessToken` | `string` | **Required**. accessToken |


### Cows

```http
  GET /api/cows
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**. accessToken |

```http
  POST /api/cows
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `entryDate` | `string` | **Required**. entryDate |
| `breed` | `string` | **Required**. breed |
| `accessToken` | `string` | **Required**. accessToken |

```http
  PATCH /api/cows/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `entryDate` | `string` | **Required**. entryDate |
| `breed` | `string` | **Required**. breed |
| `accessToken` | `string` | **Required**. accessToken |


```http
  DELETE /api/cows/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**. accessToken |


### Milks

```http
  GET /api/milks
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**. accessToken |

```http
  POST /api/milks
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `entryDate` | `string` | **Required**. entryDate |
| `size` | `string` | **Required**. size |
| `accessToken` | `string` | **Required**. accessToken |

```http
  PATCH /api/milks/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `entryDate` | `string` | **Required**. entryDate |
| `size` | `string` | **Required**. size |
| `accessToken` | `string` | **Required**. accessToken |


```http
  DELETE /api/milks/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**. accessToken |


### Responsibles

```http
  GET /api/responsibles
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**. accessToken |

```http
  POST /api/responsibles
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fullName` | `string` | **Required**. fullName |
| `email` | `string` | **Required**. email |
| `password` | `string` | **Required**. password |
| `role` | `string` | **Required**. role |
| `accessToken` | `string` | **Required**. accessToken |

```http
  PATCH /api/responsibles/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `role` | `string` | **Required**. role |
| `accessToken` | `string` | **Required**. accessToken |

```http
  DELETE /api/responsibles/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**. accessToken |
