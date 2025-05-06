import express from 'express';

const app = express();


// app.get('/', (req, res) => {
//     res.send('Server is ready')
// });

app.get('/api/students', (req, res) => {
    const student = [
        {
            id: 1,
            name: "Aarav Mehta",
            course: "Computer Science"
        },
        {
            id: 2,
            name: "Sara Khan",
            course: "Mechanical Engineering"
        },
        {
            id: 3,
            name: "Rohan Sharma",
            course: "Electrical Engineering"
        },
        {
            id: 4,
            name: "Nikita Das",
            course: "Information Technology"
        },
        {
            id: 5,
            name: "Kabir Patel",
            course: "Civil Engineering"
        },
        {
            id: 6,
            name: "Meera Joshi",
            course: "Biotechnology"
        },
        {
            id: 7,
            name: "Vikram Rao",
            course: "Electronics and Communication"
        },
        {
            id: 8,
            name: "Ishita Roy",
            course: "Data Science"
        },
        {
            id: 9,
            name: "Aditya Verma",
            course: "Artificial Intelligence"
        },
        {
            id: 10,
            name: "Sneha Kulkarni",
            course: "Software Engineering"
        }
    ];
    res.send(student)

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);

})