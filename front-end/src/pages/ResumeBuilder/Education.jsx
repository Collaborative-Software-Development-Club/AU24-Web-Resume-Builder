import React, {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {SectionTitle} from './SectionTitle';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Education = ({education}) => {
    const [educationData, setEducationData] = useState({
        institution: education.institution,
        location: education.location,
        degree: education.degree,
        specialization: '',
        minor: '',
        gpa: education.gpa,
        graduationMonth: '',
        graduationYear: education.graduationDate.year,
        honors: education.honors.name,
        // honors: '',
    });

    const handleInputChange = (e) => {
        setEducationData({...educationData, [e.target.name]: e.target.value});
    };

    const handleSelectChange = (name, value) => {
        setEducationData({...educationData, [name]: value});
    };

    return (
        <div className="">
            {/* Education Form Section */}
            <div className="w-full">
                <SectionTitle title="Education" />
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
                        <Input name="major" placeholder="Enter Major/Minor" value={educationData.degree} onChange={handleInputChange} className="times" />
                    </div>

                    <div className="flex space-x-4 md:w-1/3">
                        <Select className="times" onValueChange={(value) => handleSelectChange('graduationMonth', value)}>
                            <SelectTrigger className="times">
                                <SelectValue placeholder="Graduation Month" />
                            </SelectTrigger>
                            <SelectContent>
                                {MONTHS.map((month, index) => (
                                    <SelectItem value={index} key={month}>
                                        {month}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div className="w-">
                            <Input name="year" placeholder="Year" value={educationData.graduationYear} onChange={handleInputChange} className="times" />
                        </div>
                    </div>
                </div>

                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="w-24">
                        <Input name="gpa" placeholder="Enter GPA" value={education.gpa} onChange={handleInputChange} className="times" />
                    </div>
                </div>

                {/* GPA and Honors */}
                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="w-full">
                        <Input name="honors" placeholder="Enter Honors and Awards" value={educationData.honors} onChange={handleInputChange} className="times" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Education;
