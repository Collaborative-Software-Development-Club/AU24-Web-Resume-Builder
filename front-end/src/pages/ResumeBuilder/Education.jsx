import React, {useState} from 'react';
import {Input} from '@/components/ui/input'; // Assuming you're using Shadcn Input component
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'; // Assuming you're using Shadcn Select component
import {List} from 'lucide-react';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const Education = () => {
    const [educationData, setEducationData] = useState({
        institution: '',
        location: '',
        degree: '',
        specialization: '',
        minor: '',
        gpa: '',
        graduationMonth: '',
        graduationYear: '',
        honors: '',
    });

    const handleInputChange = (e) => {
        setEducationData({...educationData, [e.target.name]: e.target.value});
    };

    const handleSelectChange = (name, value) => {
        setEducationData({...educationData, [name]: value});
    };

    return (
        <div className="absolute left-0 right-0 p-20">
            {/* Education Form Section */}
            <div className="education-section w-full rounded-lg bg-white p-6">
                <h2 className="times mb-4 text-left text-2xl">Education:</h2>

                {/* Combined Row for Institution, Location */}
                <div className="mb-4 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                    <div className="sm:flex-grow">
                        <Input name="institution" value={educationData.institution} onChange={handleInputChange} placeholder="Enter institution" className="times" />
                    </div>
                    <div className="">
                        <Input name="location" value={educationData.location} onChange={handleInputChange} placeholder="City, State" className="times text-right" />
                    </div>
                </div>

                {/* Additional Fields */}
                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="sm:flex-grow">
                        <Input name="major" placeholder="Enter Major/Minor" onChange={handleInputChange} className="times" />
                    </div>

                    <div className="flex space-x-4 md:w-1/3">
                        <Select className='times' onValueChange={(value) => handleSelectChange('graduationMonth', value)}>
                            <SelectTrigger className="times">
                                <SelectValue placeholder="Graduation Month"/>
                            </SelectTrigger>
                            <SelectContent>
                                {MONTHS.map((month, index) => (<SelectItem value={index} key={month}>{month}</SelectItem>))}

                            </SelectContent>
                        </Select>

                        <div className="w-">
                            <Input name="year" placeholder="Year" onChange={handleInputChange} className="times" />
                        </div>
                    </div>
                </div>

                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="w-24">
                        <Input name="gpa" placeholder="Enter GPA" onChange={handleInputChange} className="times" />
                    </div>
                </div>

                {/* GPA and Honors */}
                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="w-full">
                        <Input name="honors" placeholder="Enter Honors and Awards" onChange={handleInputChange} className="times" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Education;