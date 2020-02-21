# Phase 2 - Live Code 1 (susulan)

#### WAKTU : 120 Menit / 2 Jam

## Toko trip Agung

Pada live code kali ini, kamu diminta untuk membuat aplikasi
menggunakan client-server model.

Fork repo ini, didalam repo ini terdapat 2 folder, `client`
dan `server`. Setelah selesai mengerjakan, buat pull request dengan title nama
lengkap kamu (ex: Dimitri Wahyudiputra) dan berikan comment
environment variables apa saja yang kamu gunakan dalam mengerjakan
aplikasi ini (beserta value aslinya).

### Summary

- Aplikasi ini memungkinkan user untuk membuat, mendapatkan daftar jalan-jalan (trip) dan mengupdate detail trip.
- User harus login terlebih dahulu untuk dapat mengupdate trip.
- Aplikasi ini dibuat SPA (Single Page Application) DAN **harus
  reactive/reload**. Apabila tidak reactive, -10 point.
- Wajib menggunakan sequelize dan postgres sebagai db

**Notes:**

- Berhubung kompetensi live code ini bukan MVC, maka kamu
  diperbolehkan untuk tidak membuat controller di server. Apabila kamu
  membuat routing nya di dalam 1 file routes/index.js juga diperbolehkan.
- File HTML telah disediakan, boleh menggunakan template ini, boleh juga
  menggunakan template sendiri asalkan layout-nya sama.
- Nama database **harus** `p2_livecode_1s`

## RELEASE 0 - Creating Migration, Table and Seeding

Jalankan migrasi dan seeder yang telah disediakan

## Release 1 - Authentication

### Server - Login

Buatlah endpoint untuk login sesuai dengan ketentuan sebagai berikut:

- route:
  - `POST /login`
- request:
  - body
    - `{ email: 'd@mail.com', password: '12345' }`
- response:
  - `200`: `{ access_token: '...' }`

Gunakan package JWT untuk generate access token.

### Client - Login

Todo:

- Buatlah fitur login di client side. Apabila user tidak berhasil
  login, misalnya salah email/password, akan menampilkan pesan error (No
  `alert()`!).
- Setelah berhasil login, maka form untuk login harus hilang, lalu
  muncul link/button untuk logout.
- Semua fitur di aplikasi ini mengharuskan user untuk login terlebih
  dahulu, jadi jika belum login tidak akan muncul konten apapun di
  halaman webnya. ^^

## Release 2 - Fetch the trip

### Client

Tampilkan trip yang kamu dapat dari server ke client (No page refresh ya!).

### Server

- route:
  - `GET /trips`
- request
  - headers
    - `{ access_token }`
- response
  - `200`: `[{ objecttrip }, ...]`

## Release 3.1 - Create trip

### Server

Buat endpoint untuk melakukan create pada trip yang dipilih user dengan ketentuan
sebagai berikut:

- route:
  - `POST /trips`
- request
  - headers
    - `{ access_token }`
- response
  - `200`: `{ trip: { "title": string, "location": string, "date": date }, message: "success create trip" }`

notes:

- pastikan hanya user yang login yang bisa create trip

### Client

Todo:

- Implementasikan button `Create trip` di daftar trip yang berhasil di fetch.
- Ketika button di click maka form untuk create muncul dibawah list trip.
- Pastikan semua form terisi dengan benar.
- Jika sudah disubmit maka form create akan hilang

## Release 3.2 - Update trip

### Server

Buat endpoint untuk melakukan update pada trip yang dipilih user dengan ketentuan
sebagai berikut:

- route:
  - `PUT /trips/:id`
- request
  - headers
    - `{ access_token }`
- response
  - `200`: `{ trip: { "title": string, "location": string, "date": date }, message: "success update trip" }`

notes:

- pastikan hanya user yang login yang bisa update trip

### Client

Todo:

- Implementasikan button `Edit trip` di daftar trip yang berhasil di fetch.
- Ketika button di click maka form untuk update muncul dibawah list trip.
- Ketika trip yang akan di edit telah dipilih maka input form langsung berisi informasi dari trip yang akan di edit.
- Begitu juga jika kita click button `Edit trip` dari trip yang lain makan input formnya akan berubah sesuai dengan data dari trip yang terakhir di edit
- Pastikan semua form terisi dengan benar.
- Jika sudah disubmit maka form update akan hilang

## Release 4 - Register

### Server - Register

Buatlah endpoint untuk register dengan ketentuan sebagai berikut:

- route:
  - `POST /register`
- request:
  - body:
    - `{ name: 'Sukirno', email: 'd@mail.com', password: 'secret' }`
- response:
  - `201`: `{ access_token: '...' }`

Jika telah selesai melakukan Register maka endpoint akan mengembalikan access_token

### Client - Register

Buatlah tampilan Register yang berisi 3 kolom yang sesuai dengan kolom didalam database.

- Halaman Register ini dapat diakses dari halaman LOGIN dengan menambahkan button `Register` di halaman LOGIN
- Begitu juga sebaliknya di Halaman REGISTER juga ada Button `Login` untuk kembali ke halaman LOGIN

## Release 5 - Connect with 3rd Party API

kamu diminta untuk menggunakan API dari `https://randomuser.me/` untuk mendapatkan user secara random. dan di aplikasikan di halaman REGISTER

- Buatlah Button `Random Trip` di form CREATE.
- Fungsi button tersebut untuk mengisi form create dengan memanfaatkan API dari `https://randomuser.me/`
- Manfaatkanlah data yang didapat dari randomuser yaitu "registered" "date" untuk date, dan "location" "city" untuk location

_semua field yang kamu butuhkan untuk create ada didalam randomuser.me_
