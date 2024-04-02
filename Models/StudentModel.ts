export type Student = {
    name: string;
    id: string;
    imgUrl: string;
}

const data: Student[] = [
    { 
        name: 'John Doe',
        id: '123456 ',
        imgUrl: "../assets/Avatar.jpg" 
    },
    { 
        name: 'Jane Doe', 
        id: '123457', 
        imgUrl: "../assets/Avatar.jpg" 
    },  
    { 
        name: 'John Smith', 
        id: '123458', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    { 
        name: 'Jane Smith', 
        id: '123459', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    { 
        name: 'John Brown', 
        id: '123460', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'Jane Brown', 
        id: '123461', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'John White', 
        id: '123462', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'Jane White', 
        id: '123463', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'John Green', 
        id: '123464', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'Jane Green', 
        id: '123465', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'John Black', 
        id: '123466', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'Jane Black', 
        id: '123467', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'John Blue', 
        id: '123468', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'Jane Blue', 
        id: '123469', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'John Red', 
        id: '123470', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'Jane Red', 
        id: '123471', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'John Yellow', 
        id: '123472', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'Jane Yellow', 
        id: '123473', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'John Purple', 
        id: '123474', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'Jane Purple', 
        id: '123475', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'John Orange', 
        id: '123476', 
        imgUrl: "../assets/Avatar.jpg" 
    },
    {
        name: 'Jane Orange', 
        id: '123477', 
        imgUrl: "../assets/Avatar.jpg" 
    },
]

const getAllStudents = (): Student[] => {
    return data;
}

const getStudentById = (id: string): Student | undefined => {
    return data.find(student => student.id === id);
}

const addStudent = (student: Student) => {
    data.push(student);
}

const deleteStudent = (id: string) => {
    const index = data.findIndex(student => student.id === id);
    if(index >= 0){
        data.splice(index, 1);
    }
}

export default { getAllStudents, getStudentById, addStudent, deleteStudent };