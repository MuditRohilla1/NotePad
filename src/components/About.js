import React from 'react';

const About = () => {
    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Welcome to iNoteBook</h2>
            <p className="lead">
                Ever found yourself scribbling notes on pieces of paper, only to lose them when you need them the most? Say goodbye to the hassle of paper notes and welcome iNoteBook into your life! iNoteBook is your personal digital assistant, always ready to store your thoughts, ideas, and reminders securely in the cloud.
            </p>
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card shadow-lg h-100" style={{ backgroundColor: '#f8f9fa', margin: '10px', padding: '20px' }}>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">Access Your Notes Anywhere</h5>
                            <p className="card-text">With iNoteBook, your notes are just a click away. Whether you're on your computer, tablet, or smartphone, access your notes from anywhere with an internet connection. No more worrying about leaving your notes behind!</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow-lg h-100" style={{ backgroundColor: '#f8f9fa', margin: '10px', padding: '20px' }}>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">Stay Organized with Tags</h5>
                            <p className="card-text">Keep your notes organized effortlessly with iNoteBook's tagging system. Assign tags to your notes and find them quickly whenever you need them. Say goodbye to endless searching and hello to efficient note-taking!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card shadow-lg h-100" style={{ backgroundColor: '#f8f9fa', margin: '10px', padding: '20px' }}>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">Secure Your Thoughts</h5>
                            <p className="card-text">Your privacy is our top priority. iNoteBook employs state-of-the-art security measures to ensure that your notes are safe and confidential. Rest assured that only you have access to your personal notes.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow-lg h-100" style={{ backgroundColor: '#f8f9fa', margin: '10px', padding: '20px' }}>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">Simplify Your Life</h5>
                            <p className="card-text">Streamline your workflow and boost your productivity with iNoteBook. Capture ideas on the go, organize tasks effortlessly, and stay on top of your priorities. Let iNoteBook be your trusted companion in your journey towards success.</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer bg-dark text-light rounded py-4 mt-5">
                <div className="container text-center">
                    <p className="mb-0">
                        Join the iNoteBook community today and embark on a journey of organized, stress-free note-taking. Experience the power of simplicity and start making every note count!
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default About;
