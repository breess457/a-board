
## Getting Started

open localhost : http://localhost:3000/  

node version v23.5.0

## ขั้นตอนการติดตั้ง 
npm install

## run project
npm run dev

localhost ต้อง 3000 เท่านั้น เพราะมีการอนุญาติจาก backend

## page
มีหน้า login และ สมัครสมาชิก  
หน้า detail บทความ  
หน้า ประเภทบทความ
หน้า feed  
หน้าบทความขอฉัน  

## feature
หน้า web เป็น server side rendering  
จะเข้าหน้า feed ได้จะต้อง login  
เมื่อ login แล้วจะไม่สามารถ ไปยังหน้า loginpage หรือ register page นอกจากต้อง loguot  
create / read / update / delete บทความ  
comment บทความ   
ค้นหาบทความ  
ค้นหาด้วยประเภทบทความ  
แสดง กระทู้ / จำนวนcomment   
logout  
token จะหมดอายุหลังจากผ่านระยะเวลา1วัน  
เก็บ token ไว้ใน cookie   
บังคับ กรอก input ทุกช่อง  
มี alert ในการแจ้งเตือน เช่น login ไม่ถูกต้อง / usernameซ้ำ / กรอกกระทู้ให้ครบ 


## libraries หรอื packages ตางๆ ่ ทใชี่
tailwind css ใช้ในการตกแต่งหน้าเว็บ  
font awesome : เรียกใช้ icon  
sweetalert2 : เรียกใช้ alert เพื่อแจ้งเตือน ผลลัพธ์ เช่น เพิ่มข้อมูลเรียบร้อยแล้ว  
react-select: สำหรับเลือกข้อมูลประเภทของกระทู้เพิ่ม  
ใช้ภาษา typescritp ในการเขียน code เพราะ typescript มีความ oop มากกว่า javascript