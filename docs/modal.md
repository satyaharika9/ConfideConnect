# Object Modal


```mermaid
---
Object Modal
---

classDiagram
    class Person{
        +int id
        +String userName
        +String password
        +String role
        +String gender
        +List~String~ language
    }
    class Patient{
        +int patientId
        + String dateOfBirth
        +List~String~ preExistingConditions
        +String labReport
        +String doctorsPrescription
    }
    class Doctor{
        + String name
        +String email
        +String phoneNumber
        +List~String~ qualifications
        +List~String~ certifications
        +String streetName
        +String city
        +String state
        +String country
        +String zipCode
    }
    class Lab{
        +int id
        +String name
        +String license
        +String contactPerson
        +String contactNumber
        +String email
        +String streetName
        +String city
        +String state
        +String country
        +String zipCode
    }
    class Resources{
        +int id
        +String name
        +String description
        +String date
        +String time
    }
    class Event{
        +String streetName
        +String city
        +String state
        +String country
        +String zipCode
    }
    class Request{
        +int id
        +int patientId
        +String status
        +String notificationRequiredEmail
        +String notificationRequiredPhone
        +String email
        +String phone
        +String createDate
        +String createTime
        +String publishDate
        +String publishTime
        +String name
        +String description
        +String result
    }
    class LabRequest{
        +int labId
        +String streetName
        +String city
        +String state
        +String country
        +String zipCode
    }
    class MedicalRequest{
        +int doctorId
    }
    class Donation{
        +int id
        +String name
        +String amount
        +String date
    }

    Person <|-- Admin
    Person <|-- Patient
    Person <|-- Doctor
    Request <|-- LabRequest
    Request <|-- MedicalRequest
    Resources <|-- Event
    Resources <|-- Blog

    Patient "*" *-- "1" Doctor
    MedicalRequest "1" *-- "1" Patient
    LabRequest "1" *-- "1" Patient
    LabRequest "*" *-- "1" Lab
    Blog "*" o-- "1" Doctor
    
    ```