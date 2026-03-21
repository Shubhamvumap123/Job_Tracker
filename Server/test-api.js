const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./src/model/User.Model');
const connectDB = require('./src/config/config');

const testApi = async () => {
    // Generate a mock user in the DB
    await connectDB();
    const user = await User.create({
        name: 'Test User',
        email: 'test' + Date.now() + '@example.com',
        password: 'password123',
        role: 'customer'
    });

    // Generate a mock JWT for testing
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    console.log("Creating job...");
    const createReq = await fetch('http://localhost:5000/api/jobs/create', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            company: 'Test Company',
            position: 'Backend Engineer',
            status: 'Applied',
            location: 'Remote',
            salary: '100k',
            notes: 'Test notes'
        })
    });
    const createRes = await createReq.json();
    console.log(createRes);

    if (createReq.status === 201) {
        console.log("Job created successfully. Fetching list...");
        const getReq = await fetch('http://localhost:5000/api/jobs/list', { headers });
        const getRes = await getReq.json();
        console.log("List of jobs:", getRes);

        const jobId = createRes._id;
        console.log(`Deleting job ${jobId}...`);
        const delReq = await fetch(`http://localhost:5000/api/jobs/delete/${jobId}`, {
            method: 'DELETE',
            headers
        });
        console.log("Delete status:", delReq.status);
    }
    await User.findByIdAndDelete(user._id);
    process.exit(0);
};

testApi().catch(console.error);